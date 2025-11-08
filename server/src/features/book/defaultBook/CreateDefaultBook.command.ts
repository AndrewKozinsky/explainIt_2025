import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CreateBookCommand, CreateBookInput } from 'features/book/CreateBook.command'
import { CreateBookChapterCommand, CreateBookChapterInput } from 'features/bookChapter/CreateBookChapter.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { chapters, getStructuredContent } from 'src/features/book/defaultBook/structure/structure'
import { getDefaultBookChapters } from './defaultBookChaptersTexts'

export class CreateDefaultBookCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(CreateDefaultBookCommand)
export class CreateDefaultBookHandler implements ICommandHandler<CreateDefaultBookCommand> {
	constructor(private commandBus: CommandBus) {}

	async execute(command: CreateDefaultBookCommand) {
		const { userId } = command

		const book = await this.commandBus.execute(new CreateBookCommand(userId, this.getBookData()))
		if (!book) {
			throw new CustomGraphQLError(errorMessage.book.notCreated, ErrorCode.InternalServerError_500)
		}

		const bookChapters = this.getBookChapters(book.id)
		for (const bookChapter of bookChapters) {
			await this.commandBus.execute(new CreateBookChapterCommand(userId, bookChapter))
		}
	}

	getBookData(): CreateBookInput {
		return {
			author: 'L. Frank Baum',
			name: 'The Wonderful Wizard of Oz',
			note: 'A young girl named Dorothy is swept by a tornado to the magical Land of Oz, where she seeks the Wizard’s help to return home and learns she had the power to do so all along.',
		}
	}

	// DELETE LATER
	/*getBookChapters(bookId: number): CreateBookChapterInput[] {
		const chapters = getDefaultBookChapters()

		return chapters.map((chapter) => {
			const structuredContent = textIntoChapterStructure(chapter.text)
			const textContent = JSON.stringify(structuredContent)

			return {
				bookId,
				name: chapter.name,
				header: chapter.header,
				content: textContent,
			}
		})
	}*/

	getBookChapters(bookId: number): CreateBookChapterInput[] {
		const structuredContent = getStructuredContent()

		return chapters.map((chapter, i) => {
			const content = JSON.stringify(structuredContent[i])

			return {
				bookId,
				name: chapter.name,
				header: chapter.header,
				content,
			}
		})
	}
}
