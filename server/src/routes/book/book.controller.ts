import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { CreateBookInput } from 'routes/book/input/createBook.input'
import { UpdateBookInput } from 'routes/book/input/updateBook.input'
import { CreateBookWithEmptyChapterCommand } from 'features/bookPrivate/CreateBookWithEmptyChapter.command'
import { DeletePrivateBookCommand } from 'features/bookPrivate/DeletePrivateBook.command'
import { GetBookCommand } from 'features/bookPrivate/GetBook.command'
import { GetUserBooksCommand } from 'features/bookPrivate/GetUserBooks.command'
import { UpdateBookCommand } from 'features/bookPrivate/UpdateBook.command'
import { GetPublicBookCommand } from 'features/bookPublic/GetPublicBook.command'
import { GetPublicBooksCommand } from 'features/bookPublic/GetPublicBooks.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { BookOutModel } from 'models/book/book.out.model'
import { ApiCreateBook, ApiDeleteBook, ApiGetBook, ApiGetBooks, ApiUpdateBook } from './openAPI.decorators'

@ApiTags('Book')
@Controller('book')
export class BookController {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(OptionalSessionUserGuard)
	@ApiGetBooks()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getBooks(@Req() request: Request): Promise<BookOutModel[]> {
		const publicBooks = await this.commandBus.execute(new GetPublicBooksCommand())
		let userBooks: BookOutModel[] = []

		const userId = request.user?.id
		if (userId) {
			userBooks = await this.commandBus.execute(new GetUserBooksCommand(userId))
		}

		return [...publicBooks, ...userBooks]
	}

	@ApiGetBook()
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getBook(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<BookOutModel> {
		const userId = request.session?.userId

		// Try public book first
		const publicBook = await this.commandBus.execute(new GetPublicBookCommand(id))
		if (publicBook) {
			return publicBook
		}

		// Fall back to private book (requires auth)
		if (!userId) {
			throw new Error('Unauthorized')
		}

		return await this.commandBus.execute(new GetBookCommand(userId, id))
	}

	@ApiCreateBook()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async createBook(@Body() input: CreateBookInput, @Req() request: Request): Promise<BookOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreateBookWithEmptyChapterCommand(userId, input))
	}

	@ApiUpdateBook()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post(':id')
	async updateBook(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateBookInput,
		@Req() request: Request,
	): Promise<BookOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdateBookCommand(userId, { id, ...input }))
	}

	@ApiDeleteBook()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteBook(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<boolean> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeletePrivateBookCommand(userId, { id }))
	}
}
