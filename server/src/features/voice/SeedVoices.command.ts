// import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
// import { VoiceRepository } from 'repo/voice.repository'
// import { LanguageCode, VoiceGender } from 'prisma/generated/client'

/*type VoiceSeedData = {
	name: string
	languageCode: LanguageCode
	elevenLabsVoiceId: string
	gender: VoiceGender
}*/

/*export class SeedVoicesCommand implements ICommand {
	constructor() {}
}*/

/*@CommandHandler(SeedVoicesCommand)
export class SeedVoicesHandler implements ICommandHandler<SeedVoicesCommand> {
	constructor(private voiceRepository: VoiceRepository) {}

	async execute() {
		const voicesData = this.getVoicesData()

		const existingVoices = await this.voiceRepository.getAllVoices()

		for (const voiceData of voicesData) {
			const alreadyExists = existingVoices.find((v) => v.eleven_labs_voice_id === voiceData.elevenLabsVoiceId)

			if (alreadyExists) {
				continue
			}

			await this.voiceRepository.createVoice(voiceData)
		}
	}

	private getVoicesData(): VoiceSeedData[] {
		return [
			{
				name: 'English Female',
				languageCode: LanguageCode.en,
				elevenLabsVoiceId: 'RaFzMbMIfqBcIurH6XF9',
				gender: VoiceGender.FEMALE,
			},
			{
				name: 'Spanish Female',
				languageCode: LanguageCode.es,
				elevenLabsVoiceId: 'CnB4uv7QeZvfkVTBRFNv',
				gender: VoiceGender.FEMALE,
			},
			{
				name: 'French Female',
				languageCode: LanguageCode.fr,
				elevenLabsVoiceId: 'rbFGGoDXFHtVghjHuS3E',
				gender: VoiceGender.FEMALE,
			},
			{
				name: 'German Female',
				languageCode: LanguageCode.de,
				elevenLabsVoiceId: 'nGISSznGHAgSTKaMXEPO',
				gender: VoiceGender.FEMALE,
			},
		]
	}
}*/
