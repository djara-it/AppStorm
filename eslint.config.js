import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        localStorage: "readonly",
        alert: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "off"
    }
  }
];