import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	MessageEvent,
	Param,
	ParseIntPipe,
	Post,
	Req,
	Sse,
	UseGuards,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueClientEvent, AiDialogueStreamEvent } from 'types/aiDialogueMessage'
import { AiDialogueSseHub } from 'features/aiDialogue/AiDialogueSseHub.service'
import { CreateAiDialogueCommand } from 'features/aiDialogue/CreateAiDialogue.command'
import { CreateAiDialogueMessageCommand } from 'features/aiDialogue/CreateAiDialogueMessage.command'
import { DeleteAiDialogueCommand } from 'features/aiDialogue/DeleteAiDialogue.command'
import { GenerateAiDialogueTurn } from 'features/aiDialogue/GenerateAiDialogueTurn.service'
import { GetUserDialoguesCommand } from 'features/aiDialogue/GetUserDialogues.command'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { CreateAiDialogueInput } from './inputs/createAiDialogue.input'
import { CreateAiDialogueMessageInput } from './inputs/createAiDialogueMessage.input'
import {
	ApiCreateAiDialogue,
	ApiCreateAiDialogueMessage,
	ApiDeleteAiDialogue,
	ApiGetAiDialogues,
} from './openAPI.decorators'

@ApiTags('AiDialogue')
@Controller('ai-dialogue')
export class AiDialogueController {
	constructor(
		private commandBus: CommandBus,
		private aiDialogueRepository: AiDialogueRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
		private aiDialogueSseHub: AiDialogueSseHub,
		private generateAiDialogueTurn: GenerateAiDialogueTurn,
	) {}

	@ApiCreateAiDialogue()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async createAiDialogue(@Body() input: CreateAiDialogueInput, @Req() request: Request): Promise<AiDialogueOutModel> {
		return await this.commandBus.execute(
			new CreateAiDialogueCommand({
				userId: request.user!.id,
				scenarioId: input.scenarioId,
				sourceLanguageCode: input.sourceLanguageCode,
				targetLanguageCode: input.targetLanguageCode,
			}),
		)
	}

	@ApiGetAiDialogues()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get()
	async getAiDialogues(@Req() request: Request): Promise<AiDialogueOutModel[]> {
		return await this.commandBus.execute(new GetUserDialoguesCommand(request.user!.id))
	}

	@ApiDeleteAiDialogue()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteAiDialogue(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<boolean> {
		return await this.commandBus.execute(new DeleteAiDialogueCommand(request.user!.id, { id }))
	}

	@ApiCreateAiDialogueMessage()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post(':id/messages')
	async createAiDialogueMessage(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CreateAiDialogueMessageInput,
		@Req() request: Request,
	): Promise<AiDialogueMessageOutModel> {
		const event: AiDialogueClientEvent =
			input.type === 'userActions' ? { type: 'userActions', actions: input.actions! } : { type: 'userAvoidsNPC' }

		return await this.commandBus.execute(
			new CreateAiDialogueMessageCommand({
				userId: request.user!.id,
				dialogueId: id,
				event,
			}),
		)
	}

	@UseGuards(CheckSessionCookieGuard)
	@Sse(':id/stream')
	stream(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Observable<MessageEvent> {
		const userId = request.user!.id
		const dialogueId = id

		return new Observable<MessageEvent>((subscriber) => {
			const receivedMessageIds = new Set<number>()

			// Подписываемся на SSE-шину ДО replay, чтобы не пропустить события,
			// сохранённые параллельной генерацией (POST) в окне между запросами.
			const hubSubscription = this.aiDialogueSseHub.getSubject(dialogueId).subscribe((event) => {
				if (subscriber.closed) return
				const data = event.data as AiDialogueStreamEvent | undefined
				if (data && data.type === 'message') {
					receivedMessageIds.add(data.message.id)
				}
				subscriber.next(event)
			})

			;(async () => {
				try {
					const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
					if (!dialogue) {
						if (!subscriber.closed) {
							subscriber.error(
								new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404),
							)
						}
						return
					}

					if (dialogue.user_id !== userId) {
						if (!subscriber.closed) {
							subscriber.error(
								new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403),
							)
						}
						return
					}

					// Replay: отдаём уже сохранённые сообщения (пропуская те, что уже
					// прилетели через SSE-шину, чтобы не задвоить).
					const messages = await this.aiDialogueQueryRepository.getMessagesByDialogueId(dialogueId)
					for (const message of messages) {
						if (subscriber.closed) break
						if (!receivedMessageIds.has(message.id)) {
							subscriber.next({ data: { type: 'message', message } })
						}
					}

					// Если диалог «ждёт хода» — запускаем генерацию первого ответа.
					await this.generateAiDialogueTurn.triggerIfNeeded(dialogueId)
				} catch (error) {
					if (!subscriber.closed) subscriber.error(error)
				}
			})()

			return () => {
				hubSubscription.unsubscribe()
			}
		})
	}
}
