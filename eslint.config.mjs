// Flat config equivalent of the former .eslintrc.json.
//
// `airbnb` (eslint-config-airbnb 19) and `next` (eslint-config-next 14) are
// eslintrc-only configs, so they are translated at load time with FlatCompat.
// The plugins pulled in by `next` (@next/eslint-plugin-next 14 and its
// eslint-plugin-react-hooks canary) still use the ESLint 8 rule context API
// (context.getAncestors / getScope / getFilename), so their rules are wrapped
// with @eslint/compat's fixup shim.
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

const LEGACY_PLUGINS = ["@next/next", "react-hooks"];
const fixupLegacyPlugins = (configs) =>
  configs.map((config) => {
    const plugins = config.plugins ?? {};
    const legacy = LEGACY_PLUGINS.filter((name) => plugins[name]);
    if (legacy.length === 0) return config;
    return {
      ...config,
      plugins: {
        ...plugins,
        ...Object.fromEntries(
          legacy.map((name) => [name, fixupPluginRules(plugins[name])]),
        ),
      },
    };
  });

export default [
  // extends: ["plugin:react/recommended", "airbnb", "prettier", "next"]
  ...compat.extends("plugin:react/recommended", "airbnb"),
  prettier,
  ...fixupLegacyPlugins(compat.extends("next")),
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
  {
    // airbnb only whitelists *.test.{js,jsx} for devDependency imports
    files: ["**/*.test.ts"],
    rules: {
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  },
];
