import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
  fromVite: true,
  entry: [
    "./src/index.ts",
  ],
  publint: "local-only",
  fixedExtension: false,
});
export { config as default };
