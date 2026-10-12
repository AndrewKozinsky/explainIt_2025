import { randomUUID } from 'node:crypto'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserProfileRepository } from 'repo/userProfile.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { ImageProcessingService } from 'infrastructure/imageProcessing/imageProcessing.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { CleanupUserAvatars } from './CleanupUserAvatars.service'
import {
	getUserAvatarUploadPrefix,
	USER_AVATAR_MAX_INPUT_PIXELS,
	USER_AVATAR_MAX_UPLOAD_BYTES,
	USER_AVATAR_SHORT_SIDE,
} from './userAvatarConfig'

export type AvatarPhotoUpload = { buffer: Buffer }

export class UploadUserAvatarCommand implements ICommand {
	constructor(
		public userId: number,
		public photo: AvatarPhotoUpload | undefined,
	) {}
}

@CommandHandler(UploadUserAvatarCommand)
export class UploadUserAvatarHandler implements ICommandHandler<UploadUserAvatarCommand> {
	private readonly prefix: string
	constructor(
		private readonly repository: UserProfileRepository,
		private readonly queryRepository: UserQueryRepository,
		private readonly storage: CloudflareS3Service,
		private readonly images: ImageProcessingService,
		private readonly cleanup: CleanupUserAvatars,
		config: MainConfigService,
	) {
		this.prefix = getUserAvatarUploadPrefix(config.get())
	}

	async execute(command: UploadUserAvatarCommand) {
		const buffer = command.photo?.buffer
		if (!buffer?.length || buffer.length > USER_AVATAR_MAX_UPLOAD_BYTES) throw this.invalidPhoto()

		const processed = await this.preparePhoto(buffer)
		const key = `${this.prefix}${command.userId}/${randomUUID()}.webp`
		await this.storage.uploadFile(key, processed, 'image/webp', 60_000)

		// Never delete the new key on DB/PUT errors: commit confirmation may be lost.
		// The orphan scanner removes it later only if no user references it.
		const result = await this.repository.updateProfile(command.userId, {
			avatar_preset_id: null,
			avatar_s3_key: key,
		})
		if (!result) throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.NotFound_404)

		await this.cleanup.cleanupReplacedPhoto(result.previousAvatarKey)

		return this.queryRepository.mapDbUserToOutUser(result.user)
	}

	private async preparePhoto(input: Buffer): Promise<Buffer> {
		try {
			const metadata = await this.images.inspect(input, USER_AVATAR_MAX_INPUT_PIXELS)

			if (!['jpeg', 'png', 'webp'].includes(metadata.format) || (metadata.pages ?? 1) !== 1)
				throw this.invalidPhoto()

			const result = await this.images.transform(input, {
				limitInputPixels: USER_AVATAR_MAX_INPUT_PIXELS,
				autoOrient: true,
				resize: {
					width: USER_AVATAR_SHORT_SIDE,
					height: USER_AVATAR_SHORT_SIDE,
					fit: 'outside',
					withoutEnlargement: true,
				},
				format: 'webp',
				quality: 85,
				timeoutSeconds: 15,
			})

			return result.data
		} catch {
			throw this.invalidPhoto()
		}
	}

	private invalidPhoto() {
		return new CustomError(errorMessage.user.invalidAvatarPhoto, ErrorStatusCode.BadRequest_400)
	}
}
