import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { GetBookPublicCommand } from 'features/bookPublic/GetBookPublic.command'
import { GetBooksPublicCommand } from 'features/bookPublic/GetBooksPublic.command'
import { BookPublicOutModel } from 'models/bookPublic/bookPublic.out.model'
import { ApiGetBooks, ApiGetBook } from './openAPI.decorators'

@ApiTags('BookPublic')
@Controller('book-public')
export class BookPublicController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetBooks()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getBooks(): Promise<BookPublicOutModel[]> {
		return await this.commandBus.execute(new GetBooksPublicCommand())
	}

	@ApiGetBook()
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getBook(@Param('id', ParseIntPipe) id: number): Promise<BookPublicOutModel> {
		return await this.commandBus.execute(new GetBookPublicCommand(id))
	}
}
