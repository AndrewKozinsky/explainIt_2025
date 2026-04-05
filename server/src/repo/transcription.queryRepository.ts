import { Injectable } from '@nestjs/common'
import { Transcription } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { TranscriptionOutModel } from '../models/transcription/transcription.out.model'

@Injectable()
export class TranscriptionQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getTranscriptionById(id: number): Promise<TranscriptionOutModel | null> {
		const transcription = await this.prisma.transcription.findUnique({
			where: { id },
		})

		if (!transcription) {
			return null
		}

		return this.mapDbTranscriptionToOut(transcription)
	}

	@CatchDbError()
	async getTranscriptionByWordId(wordId: number): Promise<TranscriptionOutModel | null> {
		const transcription = await this.prisma.transcription.findUnique({
			where: { word_id: wordId },
		})

		if (!transcription) {
			return null
		}

		return this.mapDbTranscriptionToOut(transcription)
	}

	private mapDbTranscriptionToOut(dbTranscription: Transcription): TranscriptionOutModel {
		return {
			id: dbTranscription.id,
			wordId: dbTranscription.word_id,
			ipa: dbTranscription.ipa,
			pinyin: dbTranscription.pinyin,
		}
	}
}
