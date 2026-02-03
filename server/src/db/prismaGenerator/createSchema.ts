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
	const createdEnums: string[] = []
	for (const tableName in bdConfig) {
		const enumContent = createEnum(bdConfig[tableName])
		if (!enumContent) continue

		if (enumContent.length) {
			if (createdEnums.includes(enumContent[0])) {
				continue
			} else {
				createdEnums.push(enumContent[0])
			}
		}

		schemaPartsArr.push(...enumContent)
	}

	const schema = schemaPartsArr.join('\n\n')

	return schema
}

function getTopPrismaSchema() {
	return `generator client {
    provider     = "prisma-client"
    output       = "../prisma/generated"
    moduleFormat = "cjs"
}

datasource db {
	provider = "postgresql"
}`
}
