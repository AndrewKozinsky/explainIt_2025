import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiCookieAuth, ApiParam, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookPrivateOutModel } from 'models/book/book.out.model'
import { CreatePrivateBookDto } from './dto/create-private-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

export function ApiCreateBookPrivate() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create private book',
			description: 'Creates a new private book with an empty first chapter for the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreatePrivateBookDto }),
		ApiResponse({ status: 201, description: 'Created', type: BookPrivateOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.book.notCreated.errorMessageCode,
				errorMessage.bookChapter.notCreated.errorMessageCode,
				errorMessage.unknownDbError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiGetUserBooks() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get user books',
			description: 'Returns all private books for the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: [BookPrivateOutModel] }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiGetBook() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get private book',
			description: 'Returns a single private book by ID. Only accessible by the book owner.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Book ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: BookPrivateOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.book.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
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
		ApiBody({ type: UpdateBookDto }),
		ApiResponse({ status: 200, description: 'OK', type: BookPrivateOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.book.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
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
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.book.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownError.errorMessageCode }),
	)
}
