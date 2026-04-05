import { Injectable } from '@nestjs/common'
import { LanguageCode } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class WordRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createWord(dto: { word: string; languageCode: LanguageCode }) {
		return await this.prisma.word.create({
			data: {
				word: dto.word,
				language_code: dto.languageCode,
			},
		})
	}
}
