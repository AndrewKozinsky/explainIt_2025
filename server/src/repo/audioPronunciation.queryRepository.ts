import { Injectable } from '@nestjs/common'
import { AudioPronunciation } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { AudioPronunciationOutModel } from '../models/audioPronunciation/audioPronunciation.out.model'

@Injectable()
export class AudioPronunciationQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getAudioPronunciationById(id: number): Promise<AudioPronunciationOutModel | null> {
		const audioPronunciation = await this.prisma.audioPronunciation.findUnique({
			where: { id },
		})

		if (!audioPronunciation) {
			return null
		}

		return this.mapToOut(audioPronunciation)
	}

	private mapToOut(db: AudioPronunciation): AudioPronunciationOutModel {
		return {
			id: db.id,
			wordId: db.word_id,
			voiceId: db.voice_id,
			audioUrl: db.audio_url,
			duration: db.duration,
		}
	}
}
