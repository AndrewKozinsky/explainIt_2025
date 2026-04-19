import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class UniversalTranscriptionRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createTranscription(dto: { universalPhraseId: number; ipa?: string | null; pinyin?: string | null }) {
		return await this.prisma.universalTranscription.create({
			data: {
				universal_phrase_id: dto.universalPhraseId,
				ipa: dto.ipa ?? null,
				pinyin: dto.pinyin ?? null,
			},
		})
	}
}
