import { MessageEvent } from '@nestjs/common'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { Observable, Subscriber } from 'rxjs'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueStreamEvent } from 'types/aiDialogueMessage'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueSseHub } from './AiDialogueSseHub.service'
import { GenerateAiDialogueTurn } from './GenerateAiDialogueTurn.service'

type DialogueStreamState = {
	authorized: boolean
	receivedMessageIds: Set<number>
	pendingEvents: MessageEvent[]
}

export class OpenAiDialogueStreamCommand implements ICommand {
	constructor(
		public userId: number,
		public dialogueId: number,
	) {}
}

@CommandHandler(OpenAiDialogueStreamCommand)
export class OpenAiDialogueStreamHandler implements ICommandHandler<
	OpenAiDialogueStreamCommand,
	Observable<MessageEvent>
> {
	constructor(
		private readonly aiDialogueRepository: AiDialogueRepository,
		private readonly aiDialogueQueryRepository: AiDialogueQueryRepository,
		private readonly aiDialogueSseHub: AiDialogueSseHub,
		private readonly generateAiDialogueTurn: GenerateAiDialogueTurn,
	) {}

	/**
	 * Возвращает холодный SSE-поток: авторизация, replay и запуск первого хода происходят только при подписке.
	 * События шины удерживаются до проверки владельца; отключение клиента снимает подписку и очищает буфер.
	 * @param command Пользователь с проверенной сессией и идентификатор диалога.
	 * @returns Observable сообщений SSE, а не завершённый результат диалога.
	 */
	async execute(command: OpenAiDialogueStreamCommand): Promise<Observable<MessageEvent>> {
		return new Observable<MessageEvent>((subscriber) => {
			const state: DialogueStreamState = { authorized: false, receivedMessageIds: new Set(), pendingEvents: [] }
			// Subscribe before replay, but hold events until ownership has been checked.
			const hubSubscription = this.aiDialogueSseHub
				.getDialogueEventSubject(command.dialogueId)
				.subscribe((event) => {
					if (subscriber.closed) return
					const data = event.data as AiDialogueStreamEvent | undefined
					if (data?.type === 'message') state.receivedMessageIds.add(data.message.id)
					if (state.authorized) subscriber.next(event)
					else state.pendingEvents.push(event)
				})

			void this.authorizeAndReplayDialogue(command, subscriber, state).catch((error) => {
				if (!subscriber.closed) subscriber.error(error)
			})

			return () => {
				hubSubscription.unsubscribe()
				state.pendingEvents.length = 0
			}
		})
	}

	/**
	 * Проверяет владельца, отдаёт удержанные события и историю с дедупликацией, затем запускает нужный первый ход.
	 * Между асинхронными шагами проверяет закрытие потока; ошибки передаются подписчику вызывающим execute.
	 * @param command Идентификаторы пользователя и диалога.
	 * @param subscriber Получатель SSE-событий текущего подключения.
	 * @param state Буфер и состояние дедупликации, принадлежащие только этой подписке.
	 */
	private async authorizeAndReplayDialogue(
		command: OpenAiDialogueStreamCommand,
		subscriber: Subscriber<MessageEvent>,
		state: DialogueStreamState,
	): Promise<void> {
		const { userId, dialogueId } = command
		const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
		if (!dialogue) throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		if (dialogue.user_id !== userId)
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)

		if (subscriber.closed) return

		state.authorized = true
		for (const event of state.pendingEvents) {
			if (!subscriber.closed) subscriber.next(event)
		}
		state.pendingEvents.length = 0
		if (subscriber.closed) return

		const messages = await this.aiDialogueQueryRepository.getMessagesByDialogueId(dialogueId)
		for (const message of messages) {
			if (subscriber.closed) break
			if (!state.receivedMessageIds.has(message.id)) subscriber.next({ data: { type: 'message', message } })
		}

		if (!subscriber.closed) subscriber.next({ data: { type: 'visualsChanged', dialogueId } })
		if (!subscriber.closed) await this.generateAiDialogueTurn.triggerIfNeeded(dialogueId)
	}
}
