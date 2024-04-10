import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
    },
  },
  {
    ignores: ['dist/**'],
  },
);

//
// export default {
//   env: {
//     browser: true,
//   },
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:@typescript-eslint/recommended-requiring-type-checking',
//     'plugin:prettier/recommended',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint'],

// };
