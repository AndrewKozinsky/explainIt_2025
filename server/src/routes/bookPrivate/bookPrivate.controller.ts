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
import { CreateBookWithEmptyChapterCommand } from 'features/bookPrivate/CreateBookWithEmptyChapter.command'
import { DeleteBookCommand } from 'features/bookPrivate/DeleteBook.command'
import { GetBookCommand } from 'features/bookPrivate/GetBook.command'
import { GetUserBooksCommand } from 'features/bookPrivate/GetUserBooks.command'
import { UpdateBookCommand } from 'features/bookPrivate/UpdateBook.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { BookPrivateOutModel } from 'models/book/book.out.model'
import { CreatePrivateBookDto } from './dto/create-private-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { ApiCreateBookPrivate, ApiDeleteBook, ApiGetBook, ApiGetUserBooks, ApiUpdateBook } from './openAPI.decorators'

@ApiTags('BookPrivate')
@Controller('book-private')
export class BookPrivateController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetUserBooks()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get()
	async getUserBooks(@Req() request: Request): Promise<BookPrivateOutModel[]> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetUserBooksCommand(userId))
	}

	@ApiGetBook()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getBook(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<BookPrivateOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetBookCommand(userId, id))
	}

	@ApiCreateBookPrivate()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async createBookPrivate(
		@Body() input: CreatePrivateBookDto,
		@Req() request: Request,
	): Promise<BookPrivateOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreateBookWithEmptyChapterCommand(userId, input))
	}

	@ApiUpdateBook()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post(':id')
	async updateBook(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateBookDto,
		@Req() request: Request,
	): Promise<BookPrivateOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdateBookCommand(userId, { id, ...input }))
	}

	@ApiDeleteBook()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteBook(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<boolean> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeleteBookCommand(userId, { id }))
	}
}
