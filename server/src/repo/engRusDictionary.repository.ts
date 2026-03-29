import { Injectable } from '@nestjs/common'
import { EngRusDictionaryItemServiceModel } from 'models/dictionary/dictionary.service.model'
import { EngRusDictionary } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class EngRusDictionaryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async saveDictionaryItem(dto: { engPhrase: string; transcription: string }) {
		const phrase = await this.prisma.engRusDictionary.create({
			data: {
				eng: dto.engPhrase,
				transcription: dto.transcription,
			},
		})

		return this.mapDbDictionaryItemToServiceDictionaryItem(phrase)
	}

	@CatchDbError()
	async getDictionaryItemByEngPhrase(engPhrase: string) {
		let phrase = await this.prisma.engRusDictionary.findFirst({
			where: {
				eng: engPhrase,
			},
		})

		if (!phrase) {
			return null
		}

		return this.mapDbDictionaryItemToServiceDictionaryItem(phrase)
	}

	mapDbDictionaryItemToServiceDictionaryItem(dbBook: EngRusDictionary): EngRusDictionaryItemServiceModel {
		return {
			id: dbBook.id,
			engPhrase: dbBook.eng,
			transcription: dbBook.transcription,
		}
	}
}
