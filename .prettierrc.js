/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'always',
  bracketSpacing: false,

  // Plugins: oxc for faster parsing, tailwindcss for class sorting
  plugins: ['@prettier/plugin-oxc', 'prettier-plugin-tailwindcss'],
}
