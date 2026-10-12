import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { avatarPresets } from './avatarPresets'
import { getAvatarUrlExpiresAt } from './userAvatarConfig'

export class GetAvatarPresetsCommand implements ICommand {}

@CommandHandler(GetAvatarPresetsCommand)
export class GetAvatarPresetsHandler implements ICommandHandler<GetAvatarPresetsCommand> {
	constructor(private readonly storage: CloudflareS3Service) {}

	async execute() {
		const avatarUrlExpiresAt = getAvatarUrlExpiresAt()
		const storage = this.storage

		return Promise.all(
			avatarPresets.map(async function (preset) {
				return {
					id: preset.id,
					gender: preset.gender,
					avatarUrl: await storage.getFileUrl(preset.s3Key),
					avatarUrlExpiresAt,
				}
			}),
		)
	}
}
