import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "prettier"
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 'react', 'react-router-dom'
            ["^react", "^react-router-dom"],
            // 외부 라이브러리
            ["^@?\\w"],
            // 내부 모듈
            ["^@pages(/.*|$)"],
            ["^@components(/.*|$)"],
            ["^.+\\.svg$"],
            ["^@hooks(/.*|$)"],
            // Side effect imports. ('./styles.css 포함')
            ["^\\u0000"],
            // Parent imports.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
          ]
        }
      ]
    }
  }
);
