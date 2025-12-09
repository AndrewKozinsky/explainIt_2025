import { BdConfig } from '../../dbConfig/dbConfigType'
import { createSchema } from '../createSchema'

export const bdTestConfig = {
	User: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			is_email_confirmed: {
				type: 'boolean',
				required: false,
			},
			is_user_active: {
				type: 'boolean',
				default: true,
				required: true,
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
	provider      = "prisma-client"
	binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]
}

datasource db {
	provider = "postgresql"
}

model User {
	id	Int	@id	@default(autoincrement())
	is_email_confirmed	Boolean?
	is_user_active	Boolean	@default(true)
}`

		const generatedPrismaSchema = createSchema(bdTestConfig)

		expect(generatedPrismaSchema).toBe(expectedPrismaSchema)
	})
})
