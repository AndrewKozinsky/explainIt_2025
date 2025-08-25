import { BdConfig } from '../../dbConfig/dbConfigType'

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
export function createManyToOneColumn(fieldConfig: BdConfig.ManyToOneField) {
	// Get first column name from thisField name: userId -> user
	let firstColumnName = fieldConfig.thisField.slice(0, -2)
	if (firstColumnName.endsWith('_')) {
		firstColumnName = firstColumnName.slice(0, -1)
	}

	// User, userId, id
	const { foreignTable, thisField, foreignField } = fieldConfig

	// For example: 'user User @relation(fields: [userId], references: [id])'
	const firstColumn = `${firstColumnName} ${foreignTable} @relation(fields: [${thisField}], references: [${foreignField}], onDelete: Cascade)`

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
export function createChildOneToOneColumn(fieldConfig: BdConfig.ChildOneToOneField) {
	const unnecessaryFieldSign = fieldConfig.required ? '' : '?'

	// Get first column name from thisField name: userId -> user OR user_id -> user
	let firstColumnName = fieldConfig.thisField.slice(0, -2)
	if (firstColumnName.endsWith('_')) {
		firstColumnName = firstColumnName.slice(0, -1)
	}

	// Creates such string:
	// 'user User @relation(fields: [user_id], references: [id])'
	const str1 = `${firstColumnName} ${fieldConfig.foreignTable}${unnecessaryFieldSign} @relation(fields: [${fieldConfig.thisField}], references: [${fieldConfig.foreignField}])`

	// Creates such string:
	// 'user_id Int	@unique'
	const str2 = `${fieldConfig.thisField} Int${unnecessaryFieldSign}	@unique`

	return ['\t' + str1, '\t' + str2]
}

export function createOneToMany(dbFieldName: string) {
	return `\t${dbFieldName}	${dbFieldName}[]`
}

export function createParentOneToOne(dbFieldName: string, fieldConfig: BdConfig.ParentOneToOneField) {
	const unnecessaryFieldSign = fieldConfig.required ? '' : '?'

	return `\t${dbFieldName}	${dbFieldName}${unnecessaryFieldSign}`
}
