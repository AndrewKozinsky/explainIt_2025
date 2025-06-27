import type { Config } from 'jest'

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': ['ts-jest', {
			useESM: true,
		}],
	},
	maxWorkers: '100%',
	transformIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/../src/$1',
	},
	// Configure ts-jest to use Node.js environment
	preset: 'ts-jest',
	testEnvironmentOptions: {
		// Enable Node.js built-in modules
		customExportConditions: ['node', 'node-addons'],
	},
};

export default config
