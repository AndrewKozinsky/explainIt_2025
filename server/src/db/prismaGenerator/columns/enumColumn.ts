import { BdConfig } from '../../dbConfig/dbConfigType'

export function createEnumColumn(dbFieldName: string, columnConfig: BdConfig.EnumField) {
	let column = `\t${dbFieldName}	${columnConfig.enumName}`

	if (columnConfig.default) {
		column += `	@default(${columnConfig.default})`
	}

	let prismaEnum = `enum ${columnConfig.enumName} {`
	columnConfig.variants.forEach((variant) => {
		prismaEnum += `\n\t${variant}`
	})
	prismaEnum += '\n}'

	return {
		column,
		prismaEnum,
	}
}
