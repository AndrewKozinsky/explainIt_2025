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
			is_email_confirmed: {
				type: 'boolean',
				default: false,
				required: true,
			},
			created_at: {
				type: 'createdAt',
			},
			some_date: {
				type: 'dateString',
				required: false,
			},
			DeviceToken: {
				type: 'oneToMany',
			},
		},
	},
	Tickets: {
		dtoProps: {},
		dbFields: {},
	},
	DeviceToken: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			device_ip: {
				type: 'string',
				required: true,
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id',
				foreignTable: 'User',
				foreignField: 'id',
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
	provider      = "prisma-client-js"
	binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]
}

datasource db {
	provider = "postgresql"
	url      = env("DB_URL")
}

model User {
	id	Int	@id	@default(autoincrement())
	email	String	@unique
	is_email_confirmed	Boolean	@default(false)
	created_at	DateTime	@default(now())
	some_date	String?
	DeviceToken	DeviceToken[]
}

model DeviceToken {
	id	Int	@id	@default(autoincrement())
	device_ip	String
	user User @relation(fields: [user_id], references: [id])
	user_id Int
}`

		const generatedPrismaSchema = createSchema(bdTestConfig)

		expect(generatedPrismaSchema).toBe(expectedPrismaSchema)
	})
})
