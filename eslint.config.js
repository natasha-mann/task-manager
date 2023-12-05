import eslint from "@eslint/js";
import eslintTypescriptParser from "@typescript-eslint/parser";
import eslintTypescript from "@typescript-eslint/eslint-plugin";
import eslintPrettier from "eslint-config-prettier";
import eslintReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: ["**/node_modules", "**/dist", "**/_generated/*"],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: eslintTypescriptParser,
    },
    plugins: {
      "@typescript-eslint": eslintTypescript,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...eslintTypescript.configs.recommended.rules,
      ...eslintPrettier.rules,
      "no-undef": "off",
      "no-redeclare": "off",
      "no-duplicate-imports": "warn",
      "@typescript-eslint/no-redeclare": "off",
      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      react: eslintReact,
      "react-hooks": eslintReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...eslintReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  {
    files: [
      "**/jest.setup.ts",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/cypress/**",
    ],
  },
];
