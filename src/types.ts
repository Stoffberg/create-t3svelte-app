export type Options = {
  name: string;
  template: "default";
  addons: Array<"eslint" | "prettier">;
  packages: Array<"prisma" | "trpc" | "tailwind" | "auth">;
};

export type File = {
  name: string;
  contents: string;
};

export type Common = {
  files: Array<{
    name: string;
    include: Condition[];
    exclude: Condition[];
    contents: string;
  }>;
};

export type Condition = "eslint" | "prettier" | "default" | "prisma" | "trpc" | "tailwind" | "auth";
