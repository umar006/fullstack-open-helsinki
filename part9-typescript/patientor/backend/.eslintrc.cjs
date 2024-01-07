/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    plugins: ['@typescript-eslint', '@stylistic'],
    rules: {
        '@stylistic/semi': ["error", "always"],
        '@stylistic/array-type': ["error", "array-simple"],
        '@stylistic/array-bracket-spacing': ["error", "always"],
        '@stylistic/arrow-parens': ["error", "always"],
        '@stylistic/arrow-spacing': "error",
        '@stylistic/object-curly-spacing': ["error", "always"],
        '@stylistic/quotes': ["error", "double"],
        '@stylistic/quote-props': ["error", "as-needed"],
        '@stylistic/comma-spacing': ["error", { "before": false, "after": true }],
        '@stylistic/indent': ['error', 2],
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    root: true,
};
