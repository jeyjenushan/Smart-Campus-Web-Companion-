import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules', 'coverage'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks':   reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars':            ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console':                ['warn', { allow: ['warn', 'error'] }],
      'prefer-const':              'error',
      'no-var':                    'error',
      'eqeqeq':                    ['error', 'always'],
      'no-duplicate-imports':      'error',
      // Disable overly strict rule - legitimate async side effects (camera, weather, profile init)
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
