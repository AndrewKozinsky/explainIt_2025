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
	Query,
	Req,
	UseGuards,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { CreateBookChapterInput } from 'routes/bookChapter/inputs/createBookChapter.input'
import { GetBookChapterInput } from 'routes/bookChapter/inputs/getBookChapter.input'
import { UpdateBookChapterInput } from 'routes/bookChapter/inputs/updateBookChapter.input'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterCommand } from 'features/bookChapter/DeleteBookChapter.command'
import { GetBookChapterCommand } from 'features/bookChapter/GetBookChapter.command'
import { UpdateBookChapterCommand } from 'features/bookChapter/UpdateBookChapter.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { BookChapterOutModel } from 'models/bookChapter/bookChapter.out.model'
import {
	ApiCreateBookChapter,
	ApiDeleteBookChapter,
	ApiGetBookChapter,
	ApiUpdateBookChapter,
} from './openAPI.decorators'

@ApiTags('BookChapter')
@Controller('book-chapter')
export class BookChapterController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetBookChapter()
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getBookChapter(
		@Param('id', ParseIntPipe) id: number,
		@Query() query: GetBookChapterInput,
		@Req() request: Request,
	): Promise<BookChapterOutModel> {
		const userId = request.session.userId
		return await this.commandBus.execute(new GetBookChapterCommand({ ...query, id }, userId))
	}

	@ApiCreateBookChapter()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async createBookChapter(
		@Body() input: CreateBookChapterInput,
		@Req() request: Request,
	): Promise<BookChapterOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreateBookChapterCommand(userId, input))
	}

	@ApiUpdateBookChapter()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post(':id')
	async updateBookChapter(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateBookChapterInput,
		@Req() request: Request,
	): Promise<BookChapterOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdateBookChapterCommand(userId, { id, ...input }))
	}

	@ApiDeleteBookChapter()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteBookChapter(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<boolean> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeleteBookChapterCommand(userId, { id }))
	}
}
