import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { AiDialogueScenarioGroupSeedData, PublicAiDialogueScenarioSeedData } from 'features/aiDialogueScenario/common'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { Prisma } from 'prisma/generated/client'

type CreateScenarioData = {
	title: string
	description: string
	systemPrompt: string
} & (
	| {
			userId: number
			slug?: null | string
			groupId?: never
			coverS3Key?: null | string
			conversationIdeas?: never
			trainedSkills?: never
	  }
	| {
			userId?: null
			slug: string
			groupId: number
			coverS3Key: string
			conversationIdeas: string
			trainedSkills: string
	  }
)

@Injectable()
export class AiDialogueScenarioRepository {
	constructor(private prisma: PrismaService) {}

	/** Создаёт публичный сценарий с группой и обложкой либо пользовательский сценарий без группы. */
	@CatchDbError()
	async createScenario(dto: CreateScenarioData) {
		return this.prisma.aiDialogueScenario.create({
			data: {
				slug: dto.slug ?? null,
				title: dto.title,
				description: dto.description,
				system_prompt: dto.systemPrompt,
				user_id: dto.userId ?? null,
				group_id: dto.groupId ?? null,
				cover_s3_key: dto.coverS3Key ?? null,
				conversation_ideas: dto.conversationIdeas ?? null,
				trained_skills: dto.trainedSkills ?? null,
			},
		})
	}

	/**
	 * Синхронизирует публичные группы и сценарии по slug одной транзакцией.
	 * Обновляет содержимое, принадлежность к группе, ключ обложки и позицию, сохраняя ID и дату создания.
	 * Позиция записи — её индекс в переданном массиве: в этом порядке список выводится на странице.
	 * Не удаляет отсутствующие в сиде записи; конфликт с пользовательским slug отменяет всю транзакцию.
	 * @param groups Группы с локализованными названиями в порядке вывода.
	 * @param scenarios Сценарии с ключами обложек для текущего MODE в порядке вывода.
	 */
	@CatchDbError()
	async synchronizePublicScenarios(
		groups: AiDialogueScenarioGroupSeedData[],
		scenarios: PublicAiDialogueScenarioSeedData[],
	) {
		const groupSlugs = new Set(groups.map((group) => group.slug))
		if (scenarios.some((scenario) => !groupSlugs.has(scenario.groupSlug))) {
			throw new CustomError(
				errorMessage.aiDialogue.scenarioGroupNotFound,
				ErrorStatusCode.InternalServerError_500,
			)
		}

		await this.prisma.$transaction(
			async (tx) => {
				const groupIds = new Map<string, number>()

				for (const [position, group] of groups.entries()) {
					const row = await this.upsertGroup(tx, group, position)
					groupIds.set(group.slug, row.id)
				}

				for (const [position, scenario] of scenarios.entries()) {
					const groupId = groupIds.get(scenario.groupSlug)!
					await this.upsertPublicScenario(tx, scenario, groupId, position)
				}
			},
			{ timeout: 30_000 },
		)
	}

	@CatchDbError()
	async getScenarioById(id: number) {
		return this.prisma.aiDialogueScenario.findUnique({ where: { id } })
	}

	/** Создаёт группу либо обновляет её тексты и позицию в переданной транзакции, сохраняя ID и created_at. */
	private upsertGroup(tx: Prisma.TransactionClient, group: AiDialogueScenarioGroupSeedData, position: number) {
		const data = { title: group.title, description: group.description, position }

		return tx.aiDialogueScenarioGroup.upsert({
			where: { slug: group.slug },
			create: { ...data, slug: group.slug },
			update: data,
		})
	}

	/**
	 * Создаёт или обновляет публичный сценарий в переданной транзакции.
	 * Проверяет владельца до upsert, чтобы сид не изменил пользовательский сценарий с таким же slug.
	 * @param groupId ID группы, полученный при синхронизации групп этой же транзакции.
	 * @param position Порядок вывода сценария на странице.
	 */
	private async upsertPublicScenario(
		tx: Prisma.TransactionClient,
		scenario: PublicAiDialogueScenarioSeedData,
		groupId: number,
		position: number,
	) {
		const existing = await tx.aiDialogueScenario.findUnique({
			where: { slug: scenario.slug },
			select: { user_id: true },
		})

		if (existing?.user_id != null) {
			throw new CustomError(
				errorMessage.aiDialogue.scenarioSlugAlreadyOwned,
				ErrorStatusCode.InternalServerError_500,
			)
		}

		const data = {
			title: scenario.title,
			description: scenario.description,
			system_prompt: scenario.systemPrompt,
			user_scenario_amendment_hint: scenario.userScenarioAmendmentHint ?? null,
			conversation_ideas: scenario.conversationIdeas,
			trained_skills: scenario.trainedSkills,
			position,
			group_id: groupId,
			cover_s3_key: scenario.coverS3Key,
		}

		// The owner precheck rejects private collisions; SQL CHECK also protects concurrent changes.
		return tx.aiDialogueScenario.upsert({
			where: { slug: scenario.slug },
			create: { ...data, slug: scenario.slug, user_id: null },
			update: data,
		})
	}
}
