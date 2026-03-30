/// <reference types="vitest/config" />
import { defineConfig, type UserConfig } from "vite";

const config: UserConfig = defineConfig({
  test: {
    includeSource: ["src/**/*.?(c|m)[jt]s?(x)"],
    execArgv: ["--allow-natives-syntax", "--expose-gc"],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
export { config as default };
