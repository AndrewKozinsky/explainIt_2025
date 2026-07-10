import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookPublicOutModel } from 'models/bookPublic/bookPublic.out.model'

export function ApiGetBooks() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get public books',
			description: 'Returns all public books with their chapters.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: [BookPublicOutModel] }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiGetBook() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get public book',
			description: 'Returns a public book by ID with its chapters.',
		}),
		ApiParam({ name: 'id', type: Number, description: 'Book ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: BookPublicOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 404, description: errorMessage.book.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}
