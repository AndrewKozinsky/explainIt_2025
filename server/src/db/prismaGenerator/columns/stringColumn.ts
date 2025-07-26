import { BdConfig } from '../../dbConfig/dbConfigType'
import { createColumnAttrs } from './columnAttrs'

export function createStringColumn(
	dbFieldName: string,
	columnConfig: BdConfig.StringField | BdConfig.EmailField | BdConfig.DateStringField | BdConfig.TimeStringField,
) {
	return `\t${dbFieldName}	String` + createColumnAttrs(columnConfig)
}
