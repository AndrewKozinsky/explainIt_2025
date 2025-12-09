import { BdConfig } from '../dbConfig/dbConfigType'
import { createEnum } from './createEnum'
import { createTable } from './createTable'

/**
 * Creates a schema.prisma file content from bdConfig.
 * You will get something like this:
 * generator client {
 *     provider      = "prisma-client-js"
 *     binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]
 * }
 *
 * datasource db {
 *     provider = "postgresql"
 * }
 *
 * model User {
 *     id                                  Int     @id @default(autoincrement())
 *     email                               String  @unique
 *     hashedPassword                      String
 *     emailConfirmationCode               String?
 *     isEmailConfirmed                    Boolean @default(false)
 * }
 *
 * @param bdConfig
 */
export function createSchema(bdConfig: BdConfig.Root) {
	const schemaPartsArr: string[] = []

	schemaPartsArr.push(getTopPrismaSchema())

	// Creates models
	for (const tableName in bdConfig) {
		const modelContent = createTable(tableName, bdConfig[tableName])
		if (!modelContent) continue

		schemaPartsArr.push(modelContent)
	}

	// Creates enums
	for (const enumName in bdConfig) {
		const enumContent = createEnum(enumName, bdConfig[enumName])
		if (!enumContent) continue

		schemaPartsArr.push(...enumContent)
	}

	const schema = schemaPartsArr.join('\n\n')
	// console.log(schema)

	return schema
}

function getTopPrismaSchema() {
	return `generator client {
	provider      = "prisma-client"
	binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]
}

datasource db {
	provider = "postgresql"
}`
}
