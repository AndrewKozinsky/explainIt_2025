import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class UniversalAudioPronunciationRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async findByUniversalPhraseId(universalPhraseId: number) {
		return await this.prisma.universalAudioPronunciation.findFirst({
			where: { universal_phrase_id: universalPhraseId },
			orderBy: { created_at: 'desc' },
		})
	}

	@CatchDbError()
	async createAudioPronunciation(dto: { universalPhraseId: number; s3Key: string }) {
		return await this.prisma.universalAudioPronunciation.create({
			data: {
				universal_phrase_id: dto.universalPhraseId,
				s3_key: dto.s3Key,
			},
		})
	}
}
