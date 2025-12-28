import * as path from 'node:path'
import { writeFile } from '../../utils/writeFile'
import { bdConfig } from '../dbConfig/dbConfig'
import { createSchema } from './createSchema'

export function generatePrismaSchemaFile() {
	const prismaSchemaContent = createSchema(bdConfig)

	const prismaFolderPath = path.resolve(__dirname, '../../../prisma')
	const prismaSchemaName = 'schema.prisma'
	const fullPath = prismaFolderPath + '/' + prismaSchemaName

	writeFile(fullPath, prismaSchemaContent)
}

generatePrismaSchemaFile()
