import { BdConfig } from '../../dbConfig/dbConfigType'

export function createArrayOfItemsColumn(dbFieldName: string, columnConfig: BdConfig.ArrayField) {
	let column = ''

	if (columnConfig.arrayItemType === 'string') {
		column = 'String[]'
	} else if (columnConfig.arrayItemType === 'number') {
		column = 'Int[]'
	} else if (columnConfig.arrayItemType === 'mongoId') {
		column = 'MONGO[]'
	}

	return `\t${dbFieldName}	` + column
}
