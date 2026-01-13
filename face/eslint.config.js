import storybook from "eslint-plugin-storybook";
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config([{
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tseslint.parser
  },
  plugins: {
    prettier: prettierPlugin,
	  'react-hooks': reactHooks,
    import: importPlugin,
  },
  rules: {
	  "react-hooks/rules-of-hooks": "error",
	  "react-hooks/exhaustive-deps": "warn",
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'type', 'index'],
      'newlines-between': 'never',
      warnOnUnassignedImports: true,
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      pathGroups: [
        {
          pattern: 'react',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '_pages/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '**/*.scss',
          group: 'index',
          position: 'after',
        },
        {
          pattern: '*.scss',
          group: 'index',
          position: 'after',
        },
        {
          pattern: './*.scss',
          group: 'index',
          position: 'after',
        },
        {
          pattern: './**/*.scss',
          group: 'index',
          position: 'after',
        },
        {
          pattern: '../*.scss',
          group: 'index',
          position: 'after',
        },
        {
          pattern: '../**/*.scss',
          group: 'index',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['react'],
    }],
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 1,
      maxBOF: 0
    }],
    'object-curly-spacing': ['warn', 'always'],
    indent: ['warn', 'tab'],
    quotes: ['warn', 'single'],
    'jsx-quotes': ['warn', 'prefer-single'],
    semi: ['warn', 'never'],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      tabWidth: 4,
      useTabs: true,
      printWidth: 120,
      trailingComma: 'all',
      jsxSingleQuote: true,
    },
	],
  }
}], storybook.configs["flat/recommended"]);
