import { defineConfig } from 'orval'

export default defineConfig({
	api: {
		input: {
			target: 'http://localhost/api/docs-json',
		},
		output: {
			mode: 'tags-split',
			target: 'shared/api/generated',
			schemas: 'shared/api/generated/models',
			client: 'react-query',
			fileExtension: '.ts',
			clean: true,
			override: {
				mutator: {
					path: 'shared/api/mutator.ts',
					name: 'customMutator',
				},
			},
		},
	},
})
