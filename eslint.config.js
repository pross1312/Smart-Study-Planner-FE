import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      prettier: prettier,
      react: react,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'warn',
      'react/jsx-uses-react': 'off',
      'no-trailing-spaces': 'warn',
      'arrow-spacing': ['warn', { before: true, after: true }],
      'block-spacing': ['warn', 'always'],
      'comma-spacing': ['warn', { before: false, after: true }],
      'eol-last': ['warn', 'always'],
      'jsx-a11y/alt-text': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],

      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',

          jsxSingleQuote: true,
          trailingComma: 'all',

          tabWidth: 2,
          semi: true,
          singleQuote: true,
          useTabs: false,
          endOfLine: 'lf',
          printWidth: 130,
          bracketSameLine: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
  },
);
