import { Injectable } from '@nestjs/common'
import { LanguageCode, Voice, VoiceGender } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class VoiceRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getAllVoices(): Promise<Voice[]> {
		return await this.prisma.voice.findMany()
	}

	@CatchDbError()
	async getVoiceByLanguageCode(languageCode: LanguageCode): Promise<Voice | null> {
		return await this.prisma.voice.findFirst({
			where: { language_code: languageCode },
		})
	}

	@CatchDbError()
	async createVoice(dto: {
		name: string
		languageCode: LanguageCode
		elevenLabsVoiceId: string
		gender: VoiceGender
	}): Promise<Voice> {
		return await this.prisma.voice.create({
			data: {
				name: dto.name,
				language_code: dto.languageCode,
				eleven_labs_voice_id: dto.elevenLabsVoiceId,
				gender: dto.gender,
			},
		})
	}
}
