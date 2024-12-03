import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: {
    ...globals.browser,
    ...globals.node,
    process: 'readonly',
  } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      react: pluginReact
    },
    settings: {
      react: {
        version: "detect",
      }
    }
  },
  { ignores: ["/node_modules/", "dist", "build"] },
  {
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  }
];

