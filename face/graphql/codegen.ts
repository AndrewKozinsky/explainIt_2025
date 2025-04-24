import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: 'http://localhost:3001/graphql',
	generates: {
		'./graphql/schema.graphql': {
			plugins: ['schema-ast'],
		},
		'./graphql/generated/index.ts': {
			documents: ['./graphql/*.graphql'],
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				dedupeOperationSuffix: true,
				omitOperationSuffix: true,
				avoidOptionals: true,
			},
		},
	},
}

export default config
