// eslint.config.mjs
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

import typescriptEslint from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import importNewlines from 'eslint-plugin-import-newlines'

import perfectionist from 'eslint-plugin-perfectionist'

export default [
  ...defineConfigWithVueTs(
    pluginVue.configs['flat/essential'],
    pluginVue.configs['flat/strongly-recommended'],
    pluginVue.configs['flat/recommended'],

    vueTsConfigs.recommended,
  ),
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
      perfectionist,
      'import-newlines': importNewlines,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,

      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      indent: ['error', 2],

      'object-curly-newline': [
        'error',
        {
          ImportDeclaration: {multiline: true, minProperties: 1},
          ExportDeclaration: {multiline: true, minProperties: 1},
        },
      ],

      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: ['const', 'let'], next: 'return'}
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // vue

      'vue/singleline-html-element-content-newline': ['error', {
        'ignoreWhenNoAttributes': true,
        'ignoreWhenEmpty': true,
        'externalIgnores': []
      }],
      'vue/html-indent': ['warn', 2],

      // importPlugin

      'import/newline-after-import': ['error', {count: 1}],

      // importNewlines

      'import-newlines/enforce': [
        'warn',
        {
          'items': 0,
          'semi': true
        }
      ],

      // perfectionist

      'perfectionist/sort-array-includes': ['warn', {
        ignoreCase: false,
        newlinesBetween: 'ignore',
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        type: 'natural',
      }],
      'perfectionist/sort-classes': ['off'],
      'perfectionist/sort-decorators': ['off'],
      'perfectionist/sort-enums': ['off'],
      'perfectionist/sort-exports': ['off'],
      'perfectionist/sort-heritage-clauses': ['warn', {
        customGroups: {},
        groups: [],
        ignoreCase: false,
        order: 'asc',
        specialCharacters: 'keep',
        type: 'natural',
      }],
      'perfectionist/sort-interfaces': ['warn', {
        customGroups: {},
        groups: [],
        ignoreCase: false,
        newlinesBetween: 'ignore',
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        type: 'natural',
      }],
      'perfectionist/sort-intersection-types': ['warn', {
        groups: [
          'named',
          'keyword',
          'operator',
          'literal',
          'function',
          'import',
          'conditional',
          'object',
          'tuple',
          'intersection',
          'union',
          'nullish',
        ],
        ignoreCase: false,
        newlinesBetween: 'ignore',
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        type: 'natural',
      }],
      'perfectionist/sort-jsx-props': ['off'],
      'perfectionist/sort-maps': ['off'],
      'perfectionist/sort-modules': ['off'],
      'perfectionist/sort-named-exports': ['off'],
      'perfectionist/sort-named-imports': ['off'],
      'perfectionist/sort-object-types': ['warn', {
        customGroups: {},
        groups: [],
        ignoreCase: false,
        newlinesBetween: 'ignore',
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        type: 'natural',
      }],
      'perfectionist/sort-objects': ['warn', {
        customGroups: {},
        destructuredObjects: true,
        groups: [],
        ignoreCase: false,
        ignorePattern: [],
        newlinesBetween: 'ignore',
        objectDeclarations: true,
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        styledComponents: true,
        type: 'natural',
      }],
      'perfectionist/sort-sets': ['warn', {
        groupKind: 'spreads-first',
        ignoreCase: false,
        newlinesBetween: 'ignore',
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        type: 'natural',
      }],
      'perfectionist/sort-switch-case': ['off'],
      'perfectionist/sort-union-types': ['warn', {
        groups: [
          'named',
          'keyword',
          'operator',
          'literal',
          'function',
          'import',
          'conditional',
          'object',
          'tuple',
          'intersection',
          'union',
          'nullish',
        ],
        ignoreCase: false,
        newlinesBetween: 'ignore',
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        type: 'natural',
      }],
      'perfectionist/sort-variable-declarations': ['warn', {
        ignoreCase: false,
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: true,
        specialCharacters: 'keep',
        type: 'natural',
      }],

    },
  },
]
