import { BdConfig } from '../../dbConfig/dbConfigType'
import { createSchema } from '../createSchema'

export const bdTestConfig = {
	User: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			created_at: {
				type: 'createdAt',
			},
			updated_at: {
				type: 'updatedAt',
			},
		},
	},
} satisfies BdConfig.Root

describe.skip('createSchemaPrisma', () => {
	it.skip('123', async () => {
		expect(2).toBe(2)
	})
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
	created_at	DateTime	@default(now())
	updated_at	DateTime	@default(now())
}`

		const generatedPrismaSchema = createSchema(bdTestConfig)

		expect(generatedPrismaSchema).toBe(expectedPrismaSchema)
	})
})
