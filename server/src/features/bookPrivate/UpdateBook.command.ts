import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'
import { BookRepository } from 'repo/book/book.repository'
import { Language } from 'utils/languages'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { BookOutModel } from 'models/book/book.out.model'

type UpdateBookInput = {
	id: number
	author?: null | string
	name?: null | string
	languageCode?: null | Language
	about?: null | string
	coverFileName?: null | string
	fileMimeType?: null | string
	isCoverFileUploaded?: boolean
}

export class UpdateBookCommand implements ICommand {
	constructor(
		public userId: number,
		public updateBookInput: UpdateBookInput,
	) {}
}

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
	constructor(
		private bookRepository: BookRepository,
		private bookQueryRepository: BookQueryRepository,
		private cloudflareS3Service: CloudflareS3Service,
		private mainConfig: MainConfigService,
	) {}

	async execute(command: UpdateBookCommand): Promise<BookOutModel> {
		const { userId, updateBookInput } = command

		const bookForUpdating = await this.bookQueryRepository.getBookById(updateBookInput.id)
		if (!bookForUpdating) {
			throw new CustomError(errorMessage.book.notFound, ErrorStatusCode.NotFound_404)
		}

		if (bookForUpdating.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const { coverFileName, coverFileS3Key, isCoverFileUploaded, uploadUrl } =
			await this.getUploadFileUrlAndFileDetails(bookForUpdating, updateBookInput)

		const book = await this.bookRepository.updateBookById(updateBookInput.id, {
			author: updateBookInput.author,
			name: updateBookInput.name,
			languageCode: updateBookInput.languageCode,
			about: updateBookInput.about,
			coverFileName,
			coverFileS3Key,
			isCoverFileUploaded,
		})

		if (!book) {
			throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
		}

		const updatedBook = await this.bookQueryRepository.getBookById(book.id)

		return {
			...updatedBook!,
			uploadUrl,
		}
	}

	private async getUploadFileUrlAndFileDetails(
		bookForUpdating: { coverFileS3Key: null | string; isCoverFileUploaded: boolean; coverFileName: null | string },
		updateBookInput: UpdateBookInput,
	): Promise<{
		coverFileName: null | string
		coverFileS3Key: null | string
		isCoverFileUploaded: boolean
		uploadUrl: null | string
	}> {
		// Deleting the cover
		if (updateBookInput.coverFileName === null || updateBookInput.isCoverFileUploaded === false) {
			if (bookForUpdating.isCoverFileUploaded && bookForUpdating.coverFileS3Key) {
				await this.cloudflareS3Service.deleteFile(bookForUpdating.coverFileS3Key)
			}

			return {
				coverFileName: null,
				coverFileS3Key: null,
				isCoverFileUploaded: false,
				uploadUrl: null,
			}
		}

		// Confirm that the file has been uploaded
		if (updateBookInput.isCoverFileUploaded) {
			return {
				coverFileName: bookForUpdating.coverFileName,
				coverFileS3Key: bookForUpdating.coverFileS3Key,
				isCoverFileUploaded: true,
				uploadUrl: null,
			}
		}

		// Generate upload URL for a new cover
		if (updateBookInput.coverFileName && updateBookInput.fileMimeType && !bookForUpdating.isCoverFileUploaded) {
			const s3FileKey = this.createCoverFileUrl(updateBookInput.coverFileName)
			const uploadUrl = await this.cloudflareS3Service.createUploadUrl(s3FileKey, updateBookInput.fileMimeType)

			return {
				coverFileName: updateBookInput.coverFileName,
				coverFileS3Key: s3FileKey,
				isCoverFileUploaded: false,
				uploadUrl,
			}
		}

		return {
			coverFileName: bookForUpdating.coverFileName,
			coverFileS3Key: bookForUpdating.coverFileS3Key,
			isCoverFileUploaded: bookForUpdating.isCoverFileUploaded,
			uploadUrl: null,
		}
	}

	private createCoverFileUrl(coverFileName: string): string {
		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		const folderName = isDevMode ? 'privateBooksDev' : 'privateBooks'

		return `${folderName}/${crypto.randomUUID()}-${coverFileName}`
	}
}
