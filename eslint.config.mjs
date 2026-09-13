// Flat config equivalent of the former .eslintrc.json.
//
// `airbnb` (eslint-config-airbnb 19) is an eslintrc-only config, so it is
// translated at load time with FlatCompat. `next` (eslint-config-next 16) ships
// a flat config and is imported directly.
import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

// eslint-config-next registers `react`, `import` and `jsx-a11y` through its own
// CommonJS interop wrappers, which can yield a different object from the one
// `airbnb` (via FlatCompat) registers under the same name. ESLint refuses to
// redefine a plugin with a different object, so use the same module instances.
const canonicalPlugins = { react, import: importPlugin, "jsx-a11y": jsxA11y };
const nextConfig = next.map((config) =>
  config.plugins
    ? {
        ...config,
        plugins: Object.fromEntries(
          Object.entries(config.plugins).map(([name, plugin]) => [
            name,
            canonicalPlugins[name] ?? plugin,
          ]),
        ),
      }
    : config,
);

export default [
  // extends: ["plugin:react/recommended", "airbnb", "prettier", "next"]
  ...compat.extends("plugin:react/recommended", "airbnb"),
  prettier,
  ...nextConfig,
  {
    plugins: { react, "@typescript-eslint": tsPlugin },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.es2021, ...globals.node },
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
    },
    rules: {
      // eslint-config-next 16 pulls in eslint-plugin-react-hooks 7, whose
      // recommended config also enables the React Compiler rules. Keep the
      // pre-16 rule set (rules-of-hooks + exhaustive-deps) until the React 19 /
      // React Compiler upgrade, where these should be revisited.
      "react-hooks/config": "off",
      "react-hooks/error-boundaries": "off",
      "react-hooks/gating": "off",
      "react-hooks/globals": "off",
      "react-hooks/immutability": "off",
      "react-hooks/incompatible-library": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/set-state-in-render": "off",
      "react-hooks/static-components": "off",
      "react-hooks/unsupported-syntax": "off",
      "react-hooks/use-memo": "off",
      "no-nested-ternary": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "react/prop-types": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
      "react/function-component-definition": [
        2,
        { namedComponents: "arrow-function" },
      ],
      "react/require-default-props": "off",
      "react/no-unused-prop-types": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TSTypeReference[typeName.name=/^(Plugin|PluginKey)$/]:not([typeParameters])",
          message: "Please provide a generic to avoid implicit `any`",
        },
        {
          selector:
            "TSTypeReference[typeName.name=/^(Plugin|PluginKey)$/][typeParameters.params.0.type=TSAnyKeyword]",
          message: "Please replace `any` with a specific type",
        },
        {
          selector:
            "NewExpression[callee.name=/^(Plugin|PluginKey)$/]:not([typeParameters])",
          message: "Please provide a generic to avoid implicit `any`",
        },
        {
          selector:
            "NewExpression[callee.name=/^(Plugin|PluginKey)$/][typeParameters.params.0.type=TSAnyKeyword]",
          message: "Please replace `any` with a specific type",
        },
      ],
      "no-unused-vars": [
        "error",
        {
          args: "all", // check all args, not just those after-used
          argsIgnorePattern: "^_+",
          varsIgnorePattern: "^_+",
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "react/jsx-filename-extension": "off",
      "import/extensions": "off",
      "import/prefer-default-export": "off",
    },
  },
];
