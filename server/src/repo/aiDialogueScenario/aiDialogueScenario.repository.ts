import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class AiDialogueScenarioRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createScenario(dto: {
		slug?: null | string
		title: string
		description: string
		systemPrompt: string
		languageCode: Language
		userId?: null | number
	}) {
		return this.prisma.aiDialogueScenario.create({
			data: {
				slug: dto.slug ?? null,
				title: dto.title,
				description: dto.description,
				system_prompt: dto.systemPrompt,
				language_code: dto.languageCode,
				user_id: dto.userId ?? null,
			},
		})
	}

	@CatchDbError()
	async getScenarioBySlug(slug: string) {
		return this.prisma.aiDialogueScenario.findUnique({ where: { slug } })
	}

	@CatchDbError()
	async getScenarioById(id: number) {
		return this.prisma.aiDialogueScenario.findUnique({ where: { id } })
	}
}
