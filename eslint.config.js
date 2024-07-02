import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  ignores: ["node_modules", "dist"],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintConfigPrettier,
    {
      languageOptions: {
        globals: {
          ...globals.node,
        },
        parserOptions: {
          project: "./tsconfig.json",
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
  },
});
