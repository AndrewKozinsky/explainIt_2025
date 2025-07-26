import { BdConfig } from '../../dbConfig/dbConfigType'
import { createSchema } from '../createSchema'

export const bdTestConfig = {
	User: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			role: {
				type: 'enum',
				enumName: 'Role',
				variants: ['USER', 'MARKETER', 'MANAGER'],
				default: 'MARKETER',
				required: true,
			},
			status: {
				type: 'enum',
				enumName: 'Status',
				variants: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELED'],
				required: false,
				description: 'Status of the user',
			},
		},
	},
} satisfies BdConfig.Root

describe('createSchemaPrisma', () => {
	it('createSchemaPrisma', () => {
		const expectedPrismaSchema = `generator client {
	provider      = "prisma-client-js"
	binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]
}

datasource db {
	provider = "postgresql"
	url      = env("DB_URL")
}

model User {
	id	Int	@id	@default(autoincrement())
	role	Role	@default(MARKETER)
	status	Status
}

enum Role {
	USER
	MARKETER
	MANAGER
}

enum Status {
	PENDING
	SUCCESS
	FAILED
	CANCELED
}`

		const generatedPrismaSchema = createSchema(bdTestConfig)

		expect(generatedPrismaSchema).toBe(expectedPrismaSchema)
	})
})
