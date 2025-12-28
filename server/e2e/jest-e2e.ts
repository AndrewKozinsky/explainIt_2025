import type { Config } from 'jest'

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	testTimeout: 35000,
	transform: {
		'^.+\\.(t|j)s$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
	maxWorkers: '100%',
	transformIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/../src/$1',
		'^infrastructure/(.*)$': '<rootDir>/../src/infrastructure/$1',
		'^features/(.*)$': '<rootDir>/../src/features/$1',
		'^repo/(.*)$': '<rootDir>/../src/repo/$1',
		'^models/(.*)$': '<rootDir>/../src/models/$1',
		'^db/(.*)$': '<rootDir>/../src/db/$1',
		'^routes/(.*)$': '<rootDir>/../src/routes/$1',
		'^prisma/(.*)$': '<rootDir>/../prisma/$1',
	},
	// Configure ts-jest to use Node.js environment
	preset: 'ts-jest',
	testEnvironmentOptions: {
		// Enable Node.js built-in modules
		customExportConditions: ['node', 'node-addons'],
	},
}

export default config
