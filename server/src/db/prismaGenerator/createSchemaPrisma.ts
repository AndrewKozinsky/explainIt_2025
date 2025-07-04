import { BdConfig } from '../dbConfig/dbConfigType'

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
 *     url      = env("DB_URL")
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
export function createSchemaPrisma(bdConfig: BdConfig.Root) {
	const topAndTablesArr: string[] = []

	topAndTablesArr.push(getTopPrismaSchema())

	// Creates models
	for (const tableName in bdConfig) {
		const table = createTableSchema(tableName, bdConfig[tableName])

		if (table) {
			topAndTablesArr.push(table)
		}
	}

	return topAndTablesArr.join('\n')
}

function getTopPrismaSchema() {
	return `generator client {
	provider      = "prisma-client-js"
	binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]
}

datasource db {
	provider = "postgresql"
	url      = env("DB_URL")
}`
}

/**
 * Creates string like this from tableConfig:
 * model User {
 *     id                                  Int     @id @default(autoincrement())
 *     email                               String  @unique
 *     hashedPassword                      String
 *     emailConfirmationCode               String?
 *     isEmailConfirmed                    Boolean @default(false)
 * }
 * @param tableName — name of a table
 * @param tableConfig — config of a table
 */
function createTableSchema(tableName: string, tableConfig: BdConfig.Table) {
	if (Object.keys(tableConfig.dbFields).length === 0) {
		return
	}

	let content = `
model ${tableName} {
`
	const columnsArr: string[] = []

	for (const dbFieldName in tableConfig.dbFields) {
		const field = tableConfig.dbFields[dbFieldName]

		if (field.type === 'index') {
			columnsArr.push(`\t${dbFieldName}	Int	@id	@default(autoincrement())`)
		} else if (field.type === 'string') {
			columnsArr.push(`\t${dbFieldName}	String` + createColumnAttrs(field))
		} else if (field.type === 'email') {
			columnsArr.push(`\t${dbFieldName}	String` + createColumnAttrs(field))
		} else if (field.type === 'dateString') {
			columnsArr.push(`\t${dbFieldName}	String` + createColumnAttrs(field))
		} else if (field.type === 'timeString') {
			columnsArr.push(`\t${dbFieldName}	String` + createColumnAttrs(field))
		} else if (field.type === 'boolean') {
			columnsArr.push(`\t${dbFieldName}	Boolean` + createColumnAttrs(field))
		} else if (field.type === 'number') {
			columnsArr.push(`\t${dbFieldName}	Int` + createColumnAttrs(field))
		} else if (field.type === 'array') {
			columnsArr.push(`\t${dbFieldName}	${createArrayOfItemsColumn(field)}`)
		} else if (field.type === 'createdAt') {
			columnsArr.push(`\t${dbFieldName}	DateTime	@default(now())`)
		} else if (field.type === 'manyToOne') {
			columnsArr.push(...createManyToOneColumn(field))
		} else if (field.type === 'oneToMany') {
			columnsArr.push(`\t${dbFieldName}	${dbFieldName}[]`)
		} else if (field.type === 'parentOneToOne') {
			columnsArr.push(`\t${dbFieldName}	${dbFieldName}?`)
		} else if (field.type === 'childOneToOne') {
			columnsArr.push(...createChildOneToOneColumn(field))
		}
	}

	content += columnsArr.join('\n')

	content += '\n}'

	return content
}

/**
 * Get column config object and form a string like
 * ? @unique @default(false)
 * depends on passed colum config
 * @param columnConfig
 */
function createColumnAttrs(columnConfig: BdConfig.Field) {
	const attrStrings: string[] = []

	if (
		columnConfig.type !== 'index' &&
		columnConfig.type !== 'manyToOne' &&
		columnConfig.type !== 'oneToMany' &&
		columnConfig.type !== 'createdAt' &&
		columnConfig.type !== 'array' &&
		columnConfig.type !== 'parentOneToOne' &&
		columnConfig.type !== 'childOneToOne'
	) {
		if (!columnConfig.required) {
			attrStrings.push('?')
		}
		if (columnConfig.default !== undefined) {
			attrStrings.push(`@default(${columnConfig.default})`)
		}
		if (columnConfig.unique) {
			attrStrings.push('@unique')
		}
	}

	if (!attrStrings.length) return ''

	const attrsString = attrStrings.join('\t')

	// Add tabulation if a string starts with a '?'
	return attrsString.startsWith('?') ? attrsString : '\t' + attrsString
}

function createArrayOfItemsColumn(columnConfig: BdConfig.ArrayField) {
	if (columnConfig.arrayItemType === 'string') {
		return 'String[]'
	} else if (columnConfig.arrayItemType === 'number') {
		return 'Int[]'
	} else if (columnConfig.arrayItemType === 'mongoId') {
		return 'MONGO[]'
	}

	return 'unknown'
}

/**
 * The function gets field name, userId for example
 * and a fieldConfig, like this:
 * {
 * 	type: 'manyToOne'
 * 	relation: {
 * 		thisField: userId
 * 		foreignTable: User // Name of the table that this column refers to
 * 		foreignField: id // Name of the column of foreign table that this column refers to
 * 	}
 *
 * 	and returns an array with 2 strings:
 * 	['author User @relation(fields: [authorId], references: [id])', 'userId  Int']
 * }
 * @param fieldConfig
 */
function createManyToOneColumn(fieldConfig: BdConfig.ManyToOneField) {
	// Get first column name from thisField name: userId -> user
	let firstColumnName = fieldConfig.thisField.slice(0, -2)
	if (firstColumnName.endsWith('_')) {
		firstColumnName = firstColumnName.slice(0, -1)
	}

	// User, userId, id
	const { foreignTable, thisField, foreignField } = fieldConfig

	// For example: 'user User @relation(fields: [userId], references: [id])'
	const firstColumn = `${firstColumnName} ${foreignTable} @relation(fields: [${thisField}], references: [${foreignField}])`

	// For example: 'userId Int'
	const secondColumn = thisField + ' Int'

	return ['\t' + firstColumn, '\t' + secondColumn]
}

/**
 * The function gets field name, userId for example
 * and a fieldConfig, like this:
 * {
 * 	type: 'childOneToOne'
 * 	thisField: userId
 * 	foreignTable: User // Name of the table that this column refers to
 * 	foreignField: id // Name of the column of foreign table that this column refers to
 * }
 * 	and returns an array with 2 strings:
 * 	['user User @relation(fields: [user_id], references: [id])', 'user_id Int	@unique']
 * @param fieldConfig
 */
function createChildOneToOneColumn(fieldConfig: BdConfig.ChildOneToOneField) {
	// Get first column name from thisField name: userId -> user OR user_id -> user
	let firstColumnName = fieldConfig.thisField.slice(0, -2)
	if (firstColumnName.endsWith('_')) {
		firstColumnName = firstColumnName.slice(0, -1)
	}

	// Creates such string:
	// 'user User @relation(fields: [user_id], references: [id])'
	const str1 = `${firstColumnName} ${fieldConfig.foreignTable} @relation(fields: [${fieldConfig.thisField}], references: [${fieldConfig.foreignField}])`

	// Creates such string:
	// 'user_id Int	@unique'
	const str2 = `${fieldConfig.thisField} Int	@unique`

	return ['\t' + str1, '\t' + str2]
}
