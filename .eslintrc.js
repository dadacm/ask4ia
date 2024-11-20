// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off', // Desabilita a regra base
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        // Permite variáveis que começam com _
        argsIgnorePattern: '^_',
        // Ignora variáveis usadas apenas em tipos
        varsIgnorePattern: '^_',
        // Não reclama de exports não utilizados
        ignoreExports: true,
      },
    ],
    // Remove a regra que verifica módulos não utilizados
    'import/no-unused-modules': 'off',
    // Apenas avisa sobre imports não utilizados dentro dos arquivos
    'unused-imports/no-unused-imports': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['/dist/*'],
};
