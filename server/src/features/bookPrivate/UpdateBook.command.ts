import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'repo/bookPrivate.repository'
import { Language } from 'utils/languages'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { BookPrivateOutModel } from 'models/book/book.out.model'

type UpdateBookInput = {
	id: number
	author?: null | string
	name?: null | string
	languageCode?: null | Language
	note?: null | string
	fileName?: null | string
	fileMimeType?: null | string
	isFileUploaded?: boolean
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
		private bookRepository: BookPrivateRepository,
		private bookQueryRepository: BookPrivateQueryRepository,
		private cloudRuS3Service: CloudRuS3Service,
		private mainConfig: MainConfigService,
	) {}

	async execute(command: UpdateBookCommand): Promise<BookPrivateOutModel> {
		const { userId, updateBookInput } = command

		const bookForUpdating = await this.bookQueryRepository.getBookById(updateBookInput.id)
		if (!bookForUpdating) {
			throw new CustomError(errorMessage.book.notFound, ErrorStatusCode.NotFound_404)
		}

		if (bookForUpdating.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const { fileName, fileS3Key, isFileUploaded, uploadUrl } = await this.getUploadFileUrlAndFileDetails(
			bookForUpdating,
			updateBookInput,
		)

		const book = await this.bookRepository.updateBookById(updateBookInput.id, {
			author: updateBookInput.author,
			name: updateBookInput.name,
			languageCode: updateBookInput.languageCode,
			note: updateBookInput.note,
			fileName,
			fileS3Key,
			isFileUploaded,
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
		bookForUpdating: { fileS3Key: null | string; isFileUploaded: boolean; fileName: null | string },
		updateBookInput: UpdateBookInput,
	): Promise<{
		fileName: null | string
		fileS3Key: null | string
		isFileUploaded: boolean
		uploadUrl: null | string
	}> {
		// Deleting the cover
		if (updateBookInput.fileName === null || updateBookInput.isFileUploaded === false) {
			if (bookForUpdating.isFileUploaded && bookForUpdating.fileS3Key) {
				await this.cloudRuS3Service.deleteFile(bookForUpdating.fileS3Key)
			}

			return {
				fileName: null,
				fileS3Key: null,
				isFileUploaded: false,
				uploadUrl: null,
			}
		}

		// Confirm that the file has been uploaded
		if (updateBookInput.isFileUploaded) {
			return {
				fileName: bookForUpdating.fileName,
				fileS3Key: bookForUpdating.fileS3Key,
				isFileUploaded: true,
				uploadUrl: null,
			}
		}

		// Generate upload URL for a new cover
		if (updateBookInput.fileName && updateBookInput.fileMimeType && !bookForUpdating.isFileUploaded) {
			const s3FileKey = this.createCoverFileUrl(updateBookInput.fileName)
			const uploadUrl = await this.cloudRuS3Service.createUploadUrl(s3FileKey, updateBookInput.fileMimeType)

			return {
				fileName: updateBookInput.fileName,
				fileS3Key: s3FileKey,
				isFileUploaded: false,
				uploadUrl,
			}
		}

		return {
			fileName: bookForUpdating.fileName,
			fileS3Key: bookForUpdating.fileS3Key,
			isFileUploaded: bookForUpdating.isFileUploaded,
			uploadUrl: null,
		}
	}

	private createCoverFileUrl(fileName: string): string {
		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		const folderName = isDevMode ? 'privateBooksDev' : 'privateBooks'

		return `${folderName}/${crypto.randomUUID()}-${fileName}`
	}
}
