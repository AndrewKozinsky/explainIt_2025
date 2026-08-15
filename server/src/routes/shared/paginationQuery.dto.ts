import { paginationFields } from 'db/dbConfig/pagination'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

/**
 * Reusable query DTO for offset pagination.
 * Extend it in endpoint inputs to add `page` / `pageSize` query params.
 */
export class PaginationQueryDto {
	@DtoFieldDecorators('page', paginationFields.page)
	page?: number

	@DtoFieldDecorators('pageSize', paginationFields.pageSize)
	pageSize?: number
}
