const tseslint = require('typescript-eslint')
const prettierPlugin = require('eslint-plugin-prettier')
const importPlugin = require('eslint-plugin-import')

module.exports = tseslint.config([{
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tseslint.parser
  },
  plugins: {
    prettier: prettierPlugin,
    import: importPlugin,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json'],
      },
    },
  },
  rules: {
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      pathGroups: [
        {
          pattern: '{infrastructure,features,models,db,prisma}/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '{infrastructure,features,models,db,prisma}',
          group: 'internal',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'never',
    }],
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['src/*', 'src/**'],
          message: 'Do not import from src/*; use path aliases like features/*, models/*, infrastructure/*, db/*, etc.',
        },
      ],
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
    }],
  }
}])
