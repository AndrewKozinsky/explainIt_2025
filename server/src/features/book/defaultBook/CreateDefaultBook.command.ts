import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CreateBookCommand, CreateBookInput } from 'features/book/CreateBook.command'
import { CreateBookChapterCommand, CreateBookChapterInput } from 'features/bookChapter/CreateBookChapter.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { textIntoChapterStructure } from 'src/features/book/chapterStructure/textIntoChapterStructure'

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
			author: 'Walter Isaacson',
			name: 'Steve Jobs',
			note: 'His tale is instructive and cautionary, filled with lessons about innovation, character, leadership, and values.',
		}
	}

	getBookChapters(bookId: number): CreateBookChapterInput[] {
		const chapters = [
			{ name: chapter_1_name, header: chapter_1_header, text: chapter_1_text },
			{ name: chapter_2_name, header: chapter_2_header, text: chapter_2_text },
			{ name: chapter_3_name, header: chapter_3_header, text: chapter_3_text },
			{ name: chapter_4_name, header: chapter_4_header, text: chapter_4_text },
			{ name: chapter_5_name, header: chapter_5_header, text: chapter_5_text },
			{ name: chapter_6_name, header: chapter_6_header, text: chapter_6_text },
			{ name: chapter_7_name, header: chapter_7_header, text: chapter_7_text },
			{ name: chapter_8_name, header: chapter_8_header, text: chapter_8_text },
			{ name: chapter_9_name, header: chapter_9_header, text: chapter_9_text },
			{ name: chapter_10_name, header: chapter_10_header, text: chapter_10_text },
			{ name: chapter_11_name, header: chapter_11_header, text: chapter_11_text },
			{ name: chapter_12_name, header: chapter_12_header, text: chapter_12_text },
			{ name: chapter_13_name, header: chapter_13_header, text: chapter_13_text },
			{ name: chapter_14_name, header: chapter_14_header, text: chapter_14_text },
			{ name: chapter_15_name, header: chapter_15_header, text: chapter_15_text },
			{ name: chapter_16_name, header: chapter_16_header, text: chapter_16_text },
			{ name: chapter_17_name, header: chapter_17_header, text: chapter_17_text },
			{ name: chapter_18_name, header: chapter_18_header, text: chapter_18_text },
			{ name: chapter_19_name, header: chapter_19_header, text: chapter_19_text },
			{ name: chapter_20_name, header: chapter_20_header, text: chapter_20_text },
			{ name: chapter_21_name, header: chapter_21_header, text: chapter_21_text },
			{ name: chapter_22_name, header: chapter_22_header, text: chapter_22_text },
			{ name: chapter_23_name, header: chapter_23_header, text: chapter_23_text },
			{ name: chapter_24_name, header: chapter_24_header, text: chapter_24_text },
		]

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
	}
}
