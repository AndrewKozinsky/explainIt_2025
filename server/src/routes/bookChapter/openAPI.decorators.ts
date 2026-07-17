import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiCookieAuth, ApiParam, ApiResponse } from '@nestjs/swagger'
import { CreateBookChapterInput } from 'routes/bookChapter/inputs/createBookChapter.input'
import { UpdateBookChapterInput } from 'routes/bookChapter/inputs/updateBookChapter.input'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookChapterOutModel } from 'models/bookChapter/bookChapter.out.model'

export function ApiCreateBookChapter() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create book chapter',
			description:
				'Creates a new chapter in a private or public book. If originalContent is provided, sentences will be auto-generated from it.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateBookChapterInput }),
		ApiResponse({ status: 201, description: 'Created', type: BookChapterOutModel }),
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
		ApiBody({ type: UpdateBookChapterInput }),
		ApiResponse({ status: 200, description: 'OK', type: BookChapterOutModel }),
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
	)
}
