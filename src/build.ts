import fs from "fs";
import path from "path";
import parser from "gitignore-parser";
import glob from "tiny-glob/sync";

import { mkdirp, rimraf } from "src/utils";
import type { Common, Condition, File } from "src/types";

const strip_jsdoc = (content: string) => {
  return content.replace(/\/\*\*\*\//g, "").replace(/\/\*\*([\s\S]+?)(@[\s\S]+?)?\*\/([\s\n]+)/g, (_match, description, _tags, whitespace) => {
    if (/^\s+(\*\s*)?$/.test(description)) {
      return "";
    }

    return `/**${description.replace(/\*\ $/, "")}*/${whitespace}`;
  });
};

const generate_templates = async (shared: Set<string>) => {
  const templates = fs.readdirSync("templates");

  for (const template of templates) {
    if (template[0] === ".") continue;

    const dir = `dist/templates/${template}`;
    const assets = `${dir}/assets`;
    mkdirp(assets);

    const cwd = path.resolve("templates", template);

    const gitignore_file = path.join(cwd, ".gitignore");
    if (!fs.existsSync(gitignore_file)) {
      throw new Error(`"${template}" template must have a .gitignore file`);
    }

    const gitignore = parser.compile(fs.readFileSync(gitignore_file, "utf-8"));

    const ignore_file = path.join(cwd, ".ignore");
    if (!fs.existsSync(ignore_file)) throw new Error("Template must have a .ignore file");
    const ignore = parser.compile(fs.readFileSync(ignore_file, "utf-8"));

    const meta_file = path.join(cwd, ".meta.json");
    if (!fs.existsSync(meta_file)) throw new Error("Template must have a .meta.json file");

    const typescript: File[] = [];

    glob("**/*", { cwd, filesOnly: true, dot: true }).forEach((name) => {
      // the package.template.json thing is a bit annoying — basically we want
      // to be able to develop and deploy the app from here, but have a different
      // package.json in newly created projects (based on package.template.json)
      if (name === "package.template.json") {
        let contents = fs.readFileSync(path.join(cwd, name), "utf8");
        // TODO package-specific versions
        contents = contents.replace(/workspace:\*/g, "next");
        fs.writeFileSync(`${dir}/package.json`, contents);
        return;
      }

      // ignore files that are written conditionally
      if (shared.has(name)) return;

      // ignore contents of .gitignore or .ignore
      if (!gitignore.accepts(name) || !ignore.accepts(name) || name === ".ignore") return;

      if (/\.(ts|svelte)$/.test(name)) {
        const contents = fs.readFileSync(path.join(cwd, name), "utf8");

        if (name.endsWith(".d.ts")) {
          typescript.push({ name, contents });
        } else {
          typescript.push({
            name,
            contents: strip_jsdoc(contents),
          });
        }
      } else {
        const dest = path.join(assets, name.replace(/^\./, "DOT-"));
        mkdirp(path.dirname(dest));
        fs.copyFileSync(path.join(cwd, name), dest);
      }
    });

    fs.copyFileSync(meta_file, `${dir}/meta.json`);
    fs.writeFileSync(`${dir}/files.types=typescript.json`, JSON.stringify(typescript, null, "\t"));
  }
};

const generate_shared = async () => {
  const cwd = path.resolve("shared");

  const shared = new Set<string>();
  const files: Common["files"] = [];

  glob("**/*", { cwd, filesOnly: true, dot: true }).forEach((file) => {
    const contents = fs.readFileSync(path.join(cwd, file), "utf8");

    const include: Condition[] = [];
    const exclude: Condition[] = [];

    let name = file;

    if (file.startsWith("+") || file.startsWith("-")) {
      const [conditions, ...rest] = file.split(path.sep);

      const pattern = /([+-])([a-z]+)/g;
      let match;
      while ((match = pattern.exec(conditions!))) {
        const set = match[1] === "+" ? include : exclude;
        set.push(match[2] as Condition);
      }

      name = rest.join("/");
    }

    shared.add(name);
    files.push({ name, include, exclude, contents });
  });

  files.sort((a, b) => a.include.length + a.exclude.length - (b.include.length + b.exclude.length));

  fs.writeFileSync("dist/templates/shared.json", JSON.stringify({ files }, null, "\t"));

  shared.delete("package.json");
  return shared;
};

const main = async () => {
  rimraf("dist/templates");
  mkdirp("dist/templates");

  const shared = await generate_shared();
  await generate_templates(shared);
};

main();
