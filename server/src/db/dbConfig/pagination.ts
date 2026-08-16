import { BdConfig } from './dbConfigType'

/**
 * Cross-cutting query fields for offset pagination.
 * Not tied to a DB model, so they live here rather than in a table's `dtoProps`.
 */
export const paginationFields: Record<string, BdConfig.Field> = {
	page: {
		type: 'number',
		min: 1,
		description: 'Page number (1-based)',
		example: 1,
		required: false,
	},
	pageSize: {
		type: 'number',
		min: 1,
		max: 100,
		description: 'Number of items per page',
		example: 20,
		required: false,
	},
}
