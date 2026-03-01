import { BdConfig } from '../../dbConfig/dbConfigType'
import { createColumnAttrs } from './columnAttrs'

export function createDateTimeColumn(dbFieldName: string, columnConfig: BdConfig.DateTimeField) {
	return `\t${dbFieldName}\tDateTime` + createColumnAttrs(columnConfig)
}
