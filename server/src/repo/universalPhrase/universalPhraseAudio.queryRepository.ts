import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { UniversalAudioPronunciation } from 'prisma/generated/client'

@Injectable()
export class UniversalPhraseAudioQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudflareS3Service: CloudflareS3Service,
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
			audioUrl: await this.cloudflareS3Service.getFileUrl(dbAudio.s3_key),
		}
	}
}
