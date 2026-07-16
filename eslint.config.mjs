import { config as baseConfig } from "./packages/eslint-config/base.js";
import { nextJsConfig } from "./packages/eslint-config/next.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  ...nextJsConfig.map((config) => {
    if (config.ignores) return config;
    return {
      ...config,
      files: ["apps/web/**/*.{ts,tsx,js,jsx}"],
    };
  }),
];
