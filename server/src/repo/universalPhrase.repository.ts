import { Injectable } from '@nestjs/common'
import { LanguageCode } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class UniversalPhraseRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createUniversalPhrase(dto: { phrase: string; languageCode: LanguageCode }) {
		return await this.prisma.universalPhrase.create({
			data: {
				phrase: dto.phrase,
				language_code: dto.languageCode,
			},
		})
	}
}
