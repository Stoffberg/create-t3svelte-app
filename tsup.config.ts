import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  clean: true,
  dts: true,
  entry: { index: "src/bin.ts", build: "src/build.ts" },
  format: ["cjs", "esm"],
  minify: !isDev,
  metafile: !isDev,
  sourcemap: true,
  target: "esnext",
  outDir: "dist",
  //onSuccess: isDev ? "node dist/index.js" : undefined,
});
