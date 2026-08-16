import { Paginated, PaginationParams } from 'types/pagination'

export function toPrismaPagination(params: PaginationParams): { skip: number; take: number } {
	return { skip: (params.page - 1) * params.pageSize, take: params.pageSize }
}

export function buildPage<T>(items: T[], total: number, params: PaginationParams): Paginated<T> {
	return {
		items,
		page: params.page,
		pageSize: params.pageSize,
		total,
		totalPages: Math.ceil(total / params.pageSize),
	}
}
