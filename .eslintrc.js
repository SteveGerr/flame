module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb", "@vue/typescript/recommended"],
  rules: {
    semi: ["error", "always"],
    "vue/multi-word-component-names": "off",
    quotes: ["error", "double"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "implicit-arrow-linebreak": "off",
  },
};
