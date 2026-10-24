import { IsInt } from 'class-validator'
import { paginationFields } from 'db/dbConfig/pagination'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

/** Общие метаданные пагинации плюс целочисленность для Prisma skip/take. */
export class GetUserDialoguesInput {
	@DtoFieldDecorators('page', paginationFields.page)
	@IsInt()
	page?: number

	@DtoFieldDecorators('pageSize', paginationFields.pageSize)
	@IsInt()
	pageSize?: number
}
