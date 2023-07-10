/** @type {import("eslint").Linter.Config} */
module.exports = {
  // this is the highest config lower ones will automatically extend
  root: true,
  reportUnusedDisableDirectives: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort", "unicorn"],
  extends: [
    "plugin:@typescript-eslint/base",
    "airbnb/base",
    "prettier",
    "next/core-web-vitals",
  ],
  ignorePatterns: ["**/*.gen.*"],
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: ".",
    project: `tsconfig.json`,
    sourceType: "module",
  },
  globals: {
    NodeJS: true,
    globalThis: "readonly",
  },
  rules: {
    "no-undef-init": "off",
    "no-underscore-dangle": "off",
    "no-nested-ternary": "off",
    "no-restricted-syntax": "off",
    camelcase: "off",
    curly: ["error", "all"],
    "no-unused-vars": [
      "error",
      {
        args: "all", // check all args, not just those after-used
        argsIgnorePattern: "^_+",
        varsIgnorePattern: "^_+",
      },
    ],
    "default-param-last": "off", // using @typescript-eslint/default-param-last instead
    "no-await-in-loop": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "import/prefer-default-export": "off",
    "no-console": "error",
    "no-dupe-class-members": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message:
              "Please import lodash functions from lodash/functionName for CJS/ESM interop. Check if your task needs lodash at https://you-dont-need.github.io/You-Dont-Need-Lodash-Underscore/#/",
          },
        ],
      },
    ],

    "no-void": [
      "error",
      {
        allowAsStatement: true,
      },
    ],
    "no-continue": "off",
    "no-return-await": "off",
    "max-classes-per-file": "off",
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    "consistent-return": "off",
    "default-case": "off",
    "class-methods-use-this": "off",
    "no-plusplus": "off",
    "unicorn/filename-case": "error",
    "unicorn/import-style": "error",
    "prefer-destructuring": "off",
    "no-else-return": "off",
    "arrow-body-style": "off",
    "no-shadow": "off",
    "@typescript-eslint/default-param-last": "error",
    // see https://github.com/typescript-eslint/typescript-eslint/issues/2483
    "@typescript-eslint/no-shadow": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    eqeqeq: [
      "error",
      "always",
      {
        null: "ignore",
      },
    ],
    "id-length": [
      "error",
      {
        min: 2,
        exceptions: ["_", "x", "y", "z", "a", "b", "i"],
        properties: "never",
      },
    ],
    "no-unused-expressions": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        minimumDescriptionLength: 10,
      },
    ],
    "no-empty-function": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsForRegex: ["^draft"],
        ignorePropertyModificationsFor: [
          "acc",
          "accumulator",
          "e",
          "ctx",
          "context",
          "req",
          "request",
          "res",
          "response",
          "$scope",
          "staticContext",
        ],
      },
    ],
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": ["error"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: `tsconfig.json`,
      },
    },
  },
  overrides: [
    {
      files: ["**/*.{c,m,}js"],
      parser: "@babel/eslint-parser", // disables typescript rules
      parserOptions: {
        requireConfigFile: false,
      },
    },
    {
      files: ["*.config.{c,m,}{j,t}s", "*.d.ts", "*rc.{c,m,}js"],
      rules: {
        "global-require": "off",
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-unused-vars": "off", // replaced by @typescript-eslint/no-unused-vars
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_+",
            varsIgnorePattern: "^_+",
          },
        ],
        "@typescript-eslint/no-floating-promises": "error",
      },
    },
  ],
};
