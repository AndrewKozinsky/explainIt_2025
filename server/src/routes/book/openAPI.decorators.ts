import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiCookieAuth, ApiParam, ApiResponse } from '@nestjs/swagger'
import { CreateBookInput } from 'routes/book/input/createBook.input'
import { UpdateBookInput } from 'routes/book/input/updateBook.input'
import { BookOutModel } from 'models/book/book.out.model'

export function ApiGetBooks() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get all books',
			description: 'Returns all public books. If the user is authenticated, also returns their private books.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: [BookOutModel] }),
	)
}

export function ApiGetBook() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get book',
			description:
				'Returns a single book by ID. Public books are accessible to everyone. Private books require authentication and ownership.',
		}),
		ApiParam({ name: 'id', type: Number, description: 'Book ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: BookOutModel }),
	)
}

export function ApiCreateBook() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create private book',
			description: 'Creates a new private book with an empty first chapter for the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateBookInput }),
		ApiResponse({ status: 201, description: 'Created', type: BookOutModel }),
	)
}

export function ApiUpdateBook() {
	return applyDecorators(
		ApiOperation({
			summary: 'Update private book',
			description:
				'Updates a private book owned by the authenticated user. Can update metadata and file-related fields for cover upload.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Book ID', example: 1 }),
		ApiBody({ type: UpdateBookInput }),
		ApiResponse({ status: 200, description: 'OK', type: BookOutModel }),
	)
}

export function ApiDeleteBook() {
	return applyDecorators(
		ApiOperation({
			summary: 'Delete private book',
			description: 'Deletes a private book owned by the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Book ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK' }),
	)
}
