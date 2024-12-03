import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
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
    }
  },
  { ignores: ["/node_modules/", "dist", "build"] },
  {
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "import/extensions": ["error", "always", {
        "js": "never",
        "jsx": "never",
        "mjs": "never"
      }]
    },
  }
];

