import { Injectable } from '@nestjs/common'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { UserRepository } from 'repo/user.repository'
import { parseAiDialogueSummary } from 'types/aiDialogueSummary'
import { UserBalanceService } from 'features/billing/UserBalance.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import type { LlmGenerateInput, LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import type { AiDialogue } from 'prisma/generated/client'
import { AI_DIALOGUE_MESSAGE_CHECK_MODEL, AI_DIALOGUE_MESSAGE_CHECK_REASONING_EFFORT } from '../aiDialogueModelConfig'
import {
	type AiDialogueUserMessageAnalysisContext,
	buildAiDialogueUserMessageCheckPrompt,
	buildAiDialogueUserMessageReviewPrompt,
} from './buildAiDialogueUserMessageCheckPrompt'
import { parseAiDialogueUserMessageCheck } from './parseAiDialogueUserMessageCheck'
import { parseAiDialogueUserMessageReview } from './parseAiDialogueUserMessageReview'
import type { AiDialogueActionItem } from 'types/aiDialogueMessage'

type AnalysisDialogue = Pick<AiDialogue, 'id' | 'user_id' | 'source_language_code' | 'target_language_code' | 'summary'>

@Injectable()
export class AiDialogueUserMessageAnalysis {
	constructor(
		private messageRepository: AiDialogueMessageRepository,
		private llmAdapter: LlmAdapterService,
		private userRepository: UserRepository,
		private userBalanceService: UserBalanceService,
	) {}

	async check(dialogue: AnalysisDialogue, speech: string, action: string) {
		const text = await this.generate(dialogue, 'text', (context) =>
			buildAiDialogueUserMessageCheckPrompt({ ...context, speech, action }),
		)
		const result = parseAiDialogueUserMessageCheck(text)

		if (
			!result ||
			(!speech && (result.speech.critical.length || result.speech.suggestions.length)) ||
			(!action && (result.action.critical.length || result.action.suggestions.length))
		) {
			throw this.invalidAnalysisError()
		}

		return result
	}

	async review(dialogue: AnalysisDialogue, actions: AiDialogueActionItem[]) {
		const review = async (partsWithCyrillic: number[] = []) => {
			const text = await this.generate(dialogue, 'json_object', (context) =>
				buildAiDialogueUserMessageReviewPrompt(context, actions, partsWithCyrillic),
			)
			const result = parseAiDialogueUserMessageReview(text, actions)
			if (!result) throw this.invalidAnalysisError()

			return result
		}

		const result = await review()
		// Среди поддерживаемых языков только русский использует кириллицу.
		if (dialogue.source_language_code === 'ru') return result

		const untranslated = findCyrillicParts(result.actions, actions)
		if (untranslated.length === 0) return result

		const retried = await review(untranslated)
		if (findCyrillicParts(retried.actions, actions).length > 0) throw this.invalidAnalysisError()
		return retried
	}

	private async generate(
		dialogue: AnalysisDialogue,
		responseFormat: LlmGenerateInput['responseFormat'],
		buildPrompt: (context: AiDialogueUserMessageAnalysisContext) => LlmMessage[],
	): Promise<string> {
		const user = await this.userRepository.getUserById(dialogue.user_id)
		if (!user) throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.NotFound_404)

		await this.userBalanceService.ensurePositiveBalanceOrThrow(user.id, 'aiDialogueMessageCheck')

		const context = await this.messageRepository.getTextCheckContext(dialogue.id)
		const summary = parseAiDialogueSummary(dialogue.summary)?.at(-1)

		const output = await this.llmAdapter.generate({
			model: AI_DIALOGUE_MESSAGE_CHECK_MODEL,
			messages: buildPrompt({
				sourceLanguageCode: dialogue.source_language_code,
				targetLanguageCode: dialogue.target_language_code,
				participantGender: user.gender,
				context: { ...context, summary: summary?.history?.slice(-3_000) ?? '' },
			}),
			responseFormat,
			reasoningEffort: AI_DIALOGUE_MESSAGE_CHECK_REASONING_EFFORT,
			timeoutMs: 45_000,
		})

		await this.userBalanceService.chargeLlm({
			userId: user.id,
			feature: 'aiDialogueMessageCheck',
			model: output.model,
			usage: output,
		})

		return output.content
	}

	private invalidAnalysisError() {
		return new CustomError(errorMessage.aiDialogue.cannotParseMessageCheck, ErrorStatusCode.InternalServerError_500)
	}
}

function findCyrillicParts(finalActions: AiDialogueActionItem[], originals: AiDialogueActionItem[]): number[] {
	return finalActions.flatMap(({ content }, index) => {
		// Цитату можно сохранить дословно, если пользователь уже заключил её в кавычки.
		const prose = content.replace(/«[^»]*»|“[^”]*”|"[^"]*"/gu, (quote) =>
			originals[index].content.includes(quote) ? '' : quote,
		)
		return /\p{Script=Cyrillic}/u.test(prose) ? [index] : []
	})
}
