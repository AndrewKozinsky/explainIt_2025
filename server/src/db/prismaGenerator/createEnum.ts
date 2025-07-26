import { BdConfig } from '../dbConfig/dbConfigType'
import { createArrayOfItemsColumn } from './columns/arrayColumn'
import { createBooleanColumn } from './columns/booleanColumn'
import { createCreatedOrUpdatedAtColum } from './columns/createdAndUpdatedAtColumn'
import { createEnumColumn } from './columns/enumColumn'
import { createNumberColumn } from './columns/numberColumn'
import { createChildOneToOneColumn, createManyToOneColumn } from './columns/relationColumns'
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
export function createEnum(tableName: string, tableConfig: BdConfig.Table) {
	if (Object.keys(tableConfig.dbFields).length === 0) {
		return
	}

	const enumsArr: string[] = []

	for (const dbFieldName in tableConfig.dbFields) {
		const field = tableConfig.dbFields[dbFieldName]
		if (field.type !== 'enum') continue

		const { prismaEnum } = createEnumColumn(dbFieldName, field)
		enumsArr.push(prismaEnum)
	}

	return enumsArr
}
