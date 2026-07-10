import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiCookieAuth, ApiParam, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookChapterOutModel } from 'models/bookChapter/bookChapter.out.model'
import { CreateBookChapterDto } from './dto/create-book-chapter.dto'
import { UpdateBookChapterDto } from './dto/update-book-chapter.dto'

export function ApiCreateBookChapter() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create book chapter',
			description:
				'Creates a new chapter in a private or public book. If originalContent is provided, sentences will be auto-generated from it.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateBookChapterDto }),
		ApiResponse({ status: 201, description: 'Created', type: BookChapterOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.book.notFound.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.bookChapter.notCreated.errorMessageCode,
				errorMessage.unknownDbError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiUpdateBookChapter() {
	return applyDecorators(
		ApiOperation({
			summary: 'Update book chapter',
			description:
				'Updates a book chapter owned by the authenticated user. If originalContent is changed, sentences will be regenerated.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Book chapter ID', example: 1 }),
		ApiBody({ type: UpdateBookChapterDto }),
		ApiResponse({ status: 200, description: 'OK', type: BookChapterOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.bookChapter.notFound.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.unknownError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiDeleteBookChapter() {
	return applyDecorators(
		ApiOperation({
			summary: 'Delete book chapter',
			description: 'Deletes a book chapter owned by the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Book chapter ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK' }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.bookChapter.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownError.errorMessageCode }),
	)
}

export function ApiGetBookChapter() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get book chapter',
			description:
				'Returns a book chapter by ID with sentences and translations. Works for both public and private books — authentication is optional for public books.',
		}),
		ApiParam({ name: 'id', type: Number, description: 'Book chapter ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: BookChapterOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.bookChapter.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}
