import { BdConfig } from '../../dbConfig/dbConfigType'
import { createSchema } from '../createSchema'

export const bdTestConfig = {
	User: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			business_hours: {
				type: 'array',
				arrayItemType: 'number',
				description: 'Array of business hours',
				required: true,
			},
			business_days: {
				type: 'array',
				arrayItemType: 'string',
				description: 'Array of business days',
				required: true,
			},
		},
	},
} satisfies BdConfig.Root

describe.skip('createSchemaPrisma', () => {
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
	business_hours	Int[]
	business_days	String[]
}`

		const generatedPrismaSchema = createSchema(bdTestConfig)

		expect(generatedPrismaSchema).toBe(expectedPrismaSchema)
	})
})
