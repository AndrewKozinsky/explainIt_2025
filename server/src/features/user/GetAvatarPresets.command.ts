import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { avatarPresets, getAvatarPresetS3Key } from './avatarPresets'

export class GetAvatarPresetsCommand implements ICommand {}

@CommandHandler(GetAvatarPresetsCommand)
export class GetAvatarPresetsHandler implements ICommandHandler<GetAvatarPresetsCommand> {
	constructor(
		private readonly storage: CloudflareS3Service,
		private readonly config: MainConfigService,
	) {}

	async execute() {
		const storage = this.storage
		const { mode } = this.config.get()

		return Promise.all(
			avatarPresets.map(async function (preset) {
				return {
					id: preset.id,
					gender: preset.gender,
					avatarUrl: await storage.getFileUrl(getAvatarPresetS3Key(preset, mode)),
				}
			}),
		)
	}
}
