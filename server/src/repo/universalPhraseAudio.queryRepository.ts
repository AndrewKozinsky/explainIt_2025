import { Injectable } from '@nestjs/common'
import { UniversalAudioPronunciation } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import { CloudRuS3Service } from '../infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { UniversalAudioPronunciationOutModel } from '../models/audioPronunciation/audioPronunciation.out.model'

@Injectable()
export class UniversalPhraseAudioQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async getAudioByUniversalPhraseId(universalPhraseId: number) {
		const audio = await this.prisma.universalAudioPronunciation.findFirst({
			where: { universal_phrase_id: universalPhraseId },
			orderBy: { created_at: 'desc' },
		})

		if (!audio) {
			return null
		}

		return this.mapDbAudioToOutAudio(audio)
	}

	private async mapDbAudioToOutAudio(
		dbAudio: UniversalAudioPronunciation,
	): Promise<UniversalAudioPronunciationOutModel> {
		return {
			id: dbAudio.id,
			universalPhraseId: dbAudio.universal_phrase_id,
			audioUrl: await this.cloudRuS3Service.getFileUrl(dbAudio.s3_key),
		}
	}
}
