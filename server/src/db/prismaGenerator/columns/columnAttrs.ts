import { BdConfig } from '../../dbConfig/dbConfigType'

/**
 * Get column config object and form a string like
 * ? @unique @default(false)
 * depends on passed colum config
 * @param columnConfig
 */
export function createColumnAttrs(
	columnConfig:
		| BdConfig.StringField
		| BdConfig.NumberField
		| BdConfig.EmailField
		| BdConfig.BooleanField
		| BdConfig.DateStringField
		| BdConfig.TimeStringField,
) {
	const attrStrings: string[] = []

	if (!columnConfig.required) {
		attrStrings.push('?')
	}
	if (columnConfig.default !== undefined) {
		attrStrings.push(`@default(${columnConfig.default})`)
	}
	if (columnConfig.unique) {
		attrStrings.push('@unique')
	}

	if (!attrStrings.length) return ''

	const attrsString = attrStrings.join('\t')

	// Add tabulation if a string starts with a '?'
	return attrsString.startsWith('?') ? attrsString : '\t' + attrsString
}
