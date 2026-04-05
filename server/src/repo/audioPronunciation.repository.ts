// import { Injectable } from '@nestjs/common'
// import { PrismaService } from '../db/prisma.service'
// import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

/*@Injectable()
export class AudioPronunciationRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createAudioPronunciation(dto: {
		wordId: number
		voiceId: number
		audioUrl: string
		duration: number
	}) {
		return await this.prisma.audioPronunciation.create({
			data: {
				word_id: dto.wordId,
				voice_id: dto.voiceId,
				audio_url: dto.audioUrl,
				duration: dto.duration,
			},
		})
	}
}*/
