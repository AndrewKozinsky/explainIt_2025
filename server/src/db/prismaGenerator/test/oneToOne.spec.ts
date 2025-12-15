import { BdConfig } from '../../dbConfig/dbConfigType'
import { createSchema } from '../createSchema'

export const bdTestConfig = {
	User: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			email: {
				type: 'email',
				unique: true,
				required: true,
			},
			Sender: {
				type: 'parentOneToOne',
				required: true,
			},
		},
	},
	Sender: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			user_id: {
				type: 'childOneToOne',
				thisField: 'user_id',
				foreignTable: 'User',
				foreignField: 'id',
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
	email	String	@unique
	Sender	Sender?
}

model Sender {
	id	Int	@id	@default(autoincrement())
	user User @relation(fields: [user_id], references: [id])
	user_id Int	@unique
}`

		const generatedPrismaSchema = createSchema(bdTestConfig)

		expect(generatedPrismaSchema).toBe(expectedPrismaSchema)
	})
})
