export function createUuidIndexColumn(dbFieldName: string) {
	return `\t${dbFieldName}\tString\t@id\t@default(uuid())`
}
