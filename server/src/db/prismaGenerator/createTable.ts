import { BdConfig } from '../dbConfig/dbConfigType'
import { createArrayOfItemsColumn } from './columns/arrayColumn'
import { createBooleanColumn } from './columns/booleanColumn'
import { createCreatedOrUpdatedAtColum } from './columns/createdAndUpdatedAtColumn'
import { createEnumColumn } from './columns/enumColumn'
import { createIndexColumn } from './columns/indexColumn'
import { createNumberColumn } from './columns/numberColumn'
import {
	createChildOneToOneColumn,
	createManyToOneColumn,
	createOneToMany,
	createParentOneToOne,
} from './columns/relationColumns'
import { createStringColumn } from './columns/stringColumn'

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
export function createTable(tableName: string, tableConfig: BdConfig.Table) {
	if (Object.keys(tableConfig.dbFields).length === 0) {
		return
	}

	let modelContent = `model ${tableName} {\n`
	const columnsArr: string[] = []

	for (const dbFieldName in tableConfig.dbFields) {
		const field = tableConfig.dbFields[dbFieldName]

		if (field.type === 'index') {
			columnsArr.push(createIndexColumn(dbFieldName))
		} else if (field.type === 'string') {
			columnsArr.push(createStringColumn(dbFieldName, field))
		} else if (field.type === 'email') {
			columnsArr.push(createStringColumn(dbFieldName, field))
		} else if (field.type === 'dateString') {
			columnsArr.push(createStringColumn(dbFieldName, field))
		} else if (field.type === 'timeString') {
			columnsArr.push(createStringColumn(dbFieldName, field))
		} else if (field.type === 'boolean') {
			columnsArr.push(createBooleanColumn(dbFieldName, field))
		} else if (field.type === 'number') {
			columnsArr.push(createNumberColumn(dbFieldName, field))
		} else if (field.type === 'array') {
			columnsArr.push(createArrayOfItemsColumn(dbFieldName, field))
		} else if (field.type === 'enum') {
			const { column } = createEnumColumn(dbFieldName, field)
			columnsArr.push(column)
		} else if (field.type === 'createdAt') {
			columnsArr.push(createCreatedOrUpdatedAtColum(dbFieldName))
		} else if (field.type === 'updatedAt') {
			columnsArr.push(createCreatedOrUpdatedAtColum(dbFieldName))
		} else if (field.type === 'manyToOne') {
			columnsArr.push(...createManyToOneColumn(field))
		} else if (field.type === 'oneToMany') {
			columnsArr.push(createOneToMany(dbFieldName))
		} else if (field.type === 'parentOneToOne') {
			columnsArr.push(createParentOneToOne(dbFieldName, field))
		} else if (field.type === 'childOneToOne') {
			columnsArr.push(...createChildOneToOneColumn(field))
		}
	}

	modelContent += columnsArr.join('\n')
	modelContent += '\n}'

	return modelContent
}
