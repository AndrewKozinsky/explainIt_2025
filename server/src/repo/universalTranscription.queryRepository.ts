import { Injectable } from '@nestjs/common'
import { UniversalTranscription } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { TranscriptionOutModel } from '../models/transcription/transcription.out.model'

@Injectable()
export class UniversalTranscriptionQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getTranscriptionById(id: number): Promise<TranscriptionOutModel | null> {
		const transcription = await this.prisma.universalTranscription.findUnique({
			where: { id },
		})

		if (!transcription) {
			return null
		}

		return this.mapDbTranscriptionToOut(transcription)
	}

	@CatchDbError()
	async getTranscriptionByUniversalPhraseId(universalPhraseId: number): Promise<TranscriptionOutModel | null> {
		const transcription = await this.prisma.universalTranscription.findUnique({
			where: { universal_phrase_id: universalPhraseId },
		})

		if (!transcription) {
			return null
		}

		return this.mapDbTranscriptionToOut(transcription)
	}

	private mapDbTranscriptionToOut(dbTranscription: UniversalTranscription): TranscriptionOutModel {
		return {
			id: dbTranscription.id,
			universalPhraseId: dbTranscription.universal_phrase_id,
			ipa: dbTranscription.ipa,
			pinyin: dbTranscription.pinyin,
		}
	}
}
