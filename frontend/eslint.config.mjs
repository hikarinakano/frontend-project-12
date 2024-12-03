import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";

export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
      sourceType: 'module',
      ecmaVersion: 2022,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact,
      import: pluginImport
    },
    settings: {
      react: {
        version: "detect",
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.mjs']
        }
      }
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error",
      "import/extensions": "off",
      "no-unused-vars": "off"
    }
  },
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: pluginReact
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error"
    }
  },
  { ignores: ["/node_modules/", "dist", "build"] }
];

