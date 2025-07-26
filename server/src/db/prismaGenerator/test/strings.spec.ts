import { BdConfig } from '../../dbConfig/dbConfigType'
import { createSchema } from '../createSchema'

export const bdTestConfig = {
	User: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			name: {
				type: 'string',
				unique: true,
				required: true,
			},
			email: {
				type: 'email',
				unique: true,
				required: true,
			},
			my_date: {
				type: 'dateString',
				required: false,
			},
			my_time: {
				type: 'timeString',
				required: true,
				default: '2025-07-19T07:05:50.528Z',
			},
		},
	},
} satisfies BdConfig.Root

describe('createSchemaPrisma', () => {
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
	name	String	@unique
	email	String	@unique
	my_date	String?
	my_time	String	@default(2025-07-19T07:05:50.528Z)
}`

		const generatedPrismaSchema = createSchema(bdTestConfig)

		expect(generatedPrismaSchema).toBe(expectedPrismaSchema)
	})
})
