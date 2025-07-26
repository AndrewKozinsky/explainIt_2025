import { BdConfig } from '../../dbConfig/dbConfigType'
import { createColumnAttrs } from './columnAttrs'

export function createBooleanColumn(dbFieldName: string, columnConfig: BdConfig.BooleanField) {
	return `\t${dbFieldName}	Boolean` + createColumnAttrs(columnConfig)
}
