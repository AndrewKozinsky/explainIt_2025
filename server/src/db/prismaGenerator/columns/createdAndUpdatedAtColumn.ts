export function createCreatedOrUpdatedAtColum(dbFieldName: string) {
	return `\t${dbFieldName}	DateTime	@default(now())`
}
