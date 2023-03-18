module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-children-prop": "off",
  },
};
