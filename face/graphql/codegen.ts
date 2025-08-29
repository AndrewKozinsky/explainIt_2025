import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: 'http://localhost/graphql',
	generates: {
		'./graphql/schema.graphql': {
			plugins: ['schema-ast'],
		},
		'./graphql/index.ts': {
			documents: ['./graphql/**/*.graphql'],
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				dedupeOperationSuffix: true,
				omitOperationSuffix: true,
				avoidOptionals: {
					inputValue: false,
				},
			},
		},
	},
}

export default config
