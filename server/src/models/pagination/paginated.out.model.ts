import { ApiProperty } from '@nestjs/swagger'

/**
 * Base class for paginated responses.
 *
 * Subclasses must redeclare `items` with a concrete `@ApiProperty({ type: [...] })`
 * so that Swagger / Orval can generate the item type for the endpoint.
 */
export abstract class PaginatedOutModel<T> {
	@ApiProperty({ description: 'Current page number (1-based)', example: 1 })
	page: number

	@ApiProperty({ description: 'Number of items per page', example: 20 })
	pageSize: number

	@ApiProperty({ description: 'Total number of items matching the query', example: 134 })
	total: number

	@ApiProperty({ description: 'Total number of pages', example: 7 })
	totalPages: number

	abstract items: T[]
}
