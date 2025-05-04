import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { z } from 'zod'
import { GigaChatService } from '../../infrastructure/gigaChat/gigaChat.service'
import { TelegramService } from '../../infrastructure/telegram/telegram.service'

type CheckTranslationInput = {
	rusSentence: string
	engSentence: string
}

type SuccessResult = {
	correct: boolean
	analysis: string
}

export class CheckTranslationByAiCommand implements ICommand {
	constructor(public checkTranslationByAiInput: CheckTranslationInput) {}
}

@CommandHandler(CheckTranslationByAiCommand)
export class CheckTranslationByAiHandler implements ICommandHandler<CheckTranslationByAiCommand> {
	constructor(
		private gigaChatService: GigaChatService,
		private telegramService: TelegramService,
	) {}

	async execute(command: CheckTranslationByAiCommand) {
		const prompt = this.createPrompt(command.checkTranslationByAiInput)

		const answerFromGigaChat = await this.gigaChatService.generateText(prompt)

		const answerObj = this.convertAnswerStrToAnswerObj(answerFromGigaChat)

		if (!answerObj) {
			return {
				error: 'Не удалось сделать запрос. Попробуйте ещё раз.',
			}
		}

		const messageToBot = this.createMessageToTelegram(
			command.checkTranslationByAiInput.engSentence,
			command.checkTranslationByAiInput.rusSentence,
			answerObj,
		)
		this.telegramService.sendMessageToFromExplainBot(messageToBot)

		return answerObj
	}

	createPrompt(input: CheckTranslationInput) {
		const { rusSentence, engSentence } = input

		return `Ты учитель английского. Проверь перевод. Перевод считается неправильным если английское предложение грамматические неверно или перевести с русского на английский так не получится.
		На русском: "${rusSentence}"
		На английском: "${engSentence}".
		Ответ предоставь в формате JSON со свойствами "correct" и "analysis".
		В свойстве "correct" находится булево значение является ли перевод на английский правильным и соответствующим предложению на русском.
		В свойстве "analysis" анализ перевода. Если перевод правильный, то похвалить человека.
		Если не правильный, то разобрать какие ошибки были сделаны и как исправить.
		Чётко следуй предоставленному формату JSON.
		`
	}

	convertAnswerStrToAnswerObj(answerStr: string): null | SuccessResult {
		try {
			let fixedAnswerStr = answerStr
				.replace(/^```json\s*/, '') // Remove starting ```json and any spaces
				.replace(/^```/, '') // (In case it's just ``` without json)
				.replace(/\s*```$/, '') // Remove ending ```

			const answerObj = JSON.parse(fixedAnswerStr)

			const answerSchema = z.object({
				correct: z.boolean(),
				analysis: z.string(),
			})

			const correctObj = answerSchema.parse(answerObj)

			if (!correctObj.analysis) {
				if (correctObj.correct) {
					correctObj.analysis = 'Перевод верный.'
				} else {
					correctObj.analysis = 'Перевод не правильный.'
				}
			}

			return correctObj
		} catch (err) {
			return null
		}
	}

	createMessageToTelegram(
		rusSentence: string,
		userTranslate: string,
		analysis: {
			correct: boolean
			analysis: string
		},
	): string {
		return `Предложение: ${rusSentence}
Перевод от пользователя: ${userTranslate}
Правильный: ${analysis.correct ? 'Да' : 'Нет'}
Анализ: ${analysis.analysis}`
	}
}
