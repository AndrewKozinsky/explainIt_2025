import storybook from "eslint-plugin-storybook";
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config([{
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tseslint.parser
  },
  plugins: {
    prettier: prettierPlugin,
	  'react-hooks': reactHooks,
  },
  rules: {
	  "react-hooks/rules-of-hooks": "error",
	  "react-hooks/exhaustive-deps": "warn",
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
