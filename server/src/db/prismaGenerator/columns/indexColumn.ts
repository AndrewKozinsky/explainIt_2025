export function createIndexColumn(dbFieldName: string) {
	return `\t${dbFieldName}	Int	@id	@default(autoincrement())`
}
