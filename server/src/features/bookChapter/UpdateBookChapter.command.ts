import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookChapterQueryRepository } from 'src/repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'
import { textIntoChapterStructure } from './chapterStructure/textIntoChapterStructure'

type UpdateBookChapterInput = {
	id: number
	name?: null | string
	header?: null | string
	content?: null | string
	note?: null | string
	// Should I convert the content into a structure?
	convertContentIntoStructure?: boolean
}

export class UpdateBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public updateBookChapterInput: UpdateBookChapterInput,
	) {}
}

@CommandHandler(UpdateBookChapterCommand)
export class UpdateBookChapterHandler implements ICommandHandler<UpdateBookChapterCommand> {
	constructor(
		private bookChapterQueryRepository: BookChapterQueryRepository,
		private bookChapterRepository: BookChapterRepository,
	) {}

	async execute(command: UpdateBookChapterCommand) {
		const { userId, updateBookChapterInput } = command

		const bookChapter = await this.bookChapterRepository.getBookChapterById(updateBookChapterInput.id)
		if (!bookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notFound, ErrorCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		if (updateBookChapterInput.content && updateBookChapterInput.convertContentIntoStructure) {
			updateBookChapterInput.content = this.prepareChapterContent(updateBookChapterInput.content)
		}

		const updatedBookChapter = await this.bookChapterRepository.updateBookChapterById(
			updateBookChapterInput.id,
			updateBookChapterInput,
		)
		if (!updatedBookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(updatedBookChapter.id)
	}

	// Convert chapter text into a structure then converts it into JSON
	prepareChapterContent(content: undefined | null | string) {
		try {
			const chapterStructure = content ? textIntoChapterStructure(content) : null
			return chapterStructure ? JSON.stringify(chapterStructure) : null
		} catch (err: unknown) {
			return null
		}
	}
}
