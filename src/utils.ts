import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const mkdirp = (dir: string) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e: any) {
    if (e.code === "EEXIST") return;
    throw e;
  }
};

export const rimraf = (path: string) => {
  ((fs as any).rmSync || fs.rmdirSync)(path, { recursive: true, force: true });
};

function identity(x: string) {
  return x;
}

export const copy = (from: string, to: string, rename = identity) => {
  if (!fs.existsSync(from)) return;

  const stats = fs.statSync(from);

  if (stats.isDirectory()) {
    fs.readdirSync(from).forEach((file) => {
      copy(path.join(from, file), path.join(to, rename(file)));
    });
  } else {
    mkdirp(path.dirname(to));
    fs.copyFileSync(from, to);
  }
};

export const dist = (path: string) => {
  return fileURLToPath(new URL(`./${path}`, import.meta.url).href);
};

export type PackageManager = "npm" | "pnpm" | "yarn";
export const getUserPkgManager: () => PackageManager = () => {
  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else {
      return "npm";
    }
  } else {
    // If no user agent is set, assume npm
    return "npm";
  }
};
