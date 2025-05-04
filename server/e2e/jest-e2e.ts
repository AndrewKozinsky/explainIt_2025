import type { Config } from 'jest'

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	maxWorkers: '100%',
	transformIgnorePatterns: ['/node_modules/'],
}

export default config
