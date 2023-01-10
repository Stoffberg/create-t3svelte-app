#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { bold, cyan, gray, green, red } from "kleur/colors";
import prompts from "prompts";

import { create } from "src/index";
import { dist, getUserPkgManager } from "src/utils";
import type { Options } from "src/types";

const { version } = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf-8")) as { version: string };
const packageManager = getUserPkgManager();

const main = async () => {
  console.log(gray(`create-t3svelte-app version ${version} run with ${packageManager}`));
  console.log(`\n${bold(cyan("Welcome to ") + red("Create-T3Svelte-App"))}\n`);

  let cwd = process.argv[2] || ".";

  if (cwd === ".") {
    const opts = await prompts(
      [
        {
          type: "text",
          name: "dir",
          message: "What do you want to call the project?",
        },
      ],
      { onCancel: () => process.exit(1) },
    );

    if (opts.dir) {
      cwd = opts.dir;
    }
  }

  if (fs.existsSync(cwd)) {
    if (fs.readdirSync(cwd).length > 0) {
      const response = await prompts({
        type: "confirm",
        name: "value",
        message: "Directory not empty. Continue?",
        initial: false,
      });

      if (!response.value) {
        process.exit(1);
      }
    }
  }

  type Answers = {
    template: Options["template"];
    addons: Array<"eslint" | "prettier">;
    packages: Array<"prisma" | "trpc" | "tailwind" | "auth">;
  };

  const answers: Answers = await prompts(
    [
      {
        type: "select",
        name: "template",
        message: "What template would you like to use?",
        choices: fs.readdirSync(dist("templates")).flatMap((dir) => {
          if (!fs.lstatSync(dist(`templates/${dir}`)).isDirectory()) return [];

          const meta_file = dist(`templates/${dir}/meta.json`);
          const { title, description } = JSON.parse(fs.readFileSync(meta_file, "utf8"));

          return {
            title,
            description,
            value: dir,
          };
        }),
      },
      {
        type: "multiselect",
        name: "packages",
        message: "What packages would you like to enable?",
        choices: [
          { title: "tRPC", value: "trpc", selected: true },
          { title: "Prisma", value: "prisma", selected: true },
          { title: "Tailwind", value: "tailwind", selected: true },
          { title: "Auth", value: "auth", selected: true },
        ],
      },
      {
        type: "multiselect",
        name: "addons",
        message: "What additional tooling do you like to enable?",
        choices: [
          { title: "ESLint", value: "eslint", selected: true },
          { title: "Prettier", value: "prettier", selected: true },
        ],
      },
    ],
    {
      onCancel: () => {
        process.exit(1);
      },
    },
  );

  const options: Options = {
    ...answers,
    name: path.basename(path.resolve(cwd)),
    addons: answers.addons,
    packages: answers.packages,
  };

  await create(cwd, options);

  console.log(bold(green("\nYour project is ready!")));

  console.log(bold("✔ Typescript"));
  console.log('  Inside Svelte components, use <script lang="ts">');

  if (options.packages.includes("trpc")) {
    console.log(bold("✔ tRPC"));
    console.log(cyan("  https://trpc.io/docs"));
  }

  if (options.packages.includes("prisma")) {
    console.log(bold("✔ Prisma"));
    console.log(cyan("  https://www.prisma.io/docs"));
  }

  if (options.packages.includes("tailwind")) {
    console.log(bold("✔ Tailwind"));
    console.log(cyan("  https://tailwindcss.com/docs"));
  }

  if (options.packages.includes("auth")) {
    console.log(bold("✔ Auth"));
    console.log(cyan("  https://authjs.dev/"));
  }

  if (options.addons.includes("eslint")) {
    console.log(bold("✔ ESLint"));
    console.log(cyan("  https://eslint.org/docs/latest"));
  }

  if (options.addons.includes("prettier")) {
    console.log(bold("✔ Prettier"));
    console.log(cyan("  https://prettier.io/docs/en/index.html"));
  }

  console.log("\nNext steps:");
  let i = 1;

  const relative = path.relative(process.cwd(), cwd);
  if (relative !== "") {
    console.log(`  ${i++}: ${bold(cyan(`cd ${relative}`))}`);
  }

  console.log(`  ${i++}: ${bold(cyan(`${packageManager} install`))}`);
  if (options.packages.includes("prisma")) {
    console.log(`  ${i++}: ${bold(cyan(`${packageManager} run db-push`))} (optional - sync a database schema)`);
  }
  console.log(`  ${i++}: ${bold(cyan(`${packageManager} run sync`))}`);
  console.log(`  ${i++}: ${bold(cyan(`${packageManager} run dev`))}`);

  console.log(`\nTo close the dev server, hit ${bold(cyan("Ctrl-C"))}`);
  console.log(`Stuck? Visit the official svelte website at ${cyan("https://svelte.dev/chat")}\n`);
};

main();
