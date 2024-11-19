// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off', // Desabilita a regra base
    '@typescript-eslint/no-unused-vars': ['error'], // Habilita a regra do TypeScript
    'import/no-unused-modules': [1, { unusedExports: true }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['/dist/*'],
};
