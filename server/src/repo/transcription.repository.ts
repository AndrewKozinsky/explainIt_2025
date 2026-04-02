import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class TranscriptionRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createTranscription(dto: { wordId: number; ipa?: string | null; pinyin?: string | null }) {
		return await this.prisma.transcription.create({
			data: {
				word_id: dto.wordId,
				ipa: dto.ipa ?? null,
				pinyin: dto.pinyin ?? null,
			},
		})
	}
}
