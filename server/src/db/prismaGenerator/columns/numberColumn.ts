import { BdConfig } from '../../dbConfig/dbConfigType'
import { createColumnAttrs } from './columnAttrs'

export function createNumberColumn(dbFieldName: string, columnConfig: BdConfig.NumberField) {
	return `\t${dbFieldName}	Int` + createColumnAttrs(columnConfig)
}
