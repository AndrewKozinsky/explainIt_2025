import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	MessageEvent,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Req,
	Sse,
	UseGuards,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { AiDialogueClientEvent } from 'types/aiDialogueMessage'
import { GetAiDialogueAudioCommand } from 'features/aiDialogue/audio/GetAiDialogueAudio.command'
import { CreateAiDialogueCommand } from 'features/aiDialogue/CreateAiDialogue.command'
import { CreateAiDialogueMessageCommand } from 'features/aiDialogue/CreateAiDialogueMessage.command'
import { DeleteAiDialogueCommand } from 'features/aiDialogue/DeleteAiDialogue.command'
import { GetAiDialogueCommand } from 'features/aiDialogue/GetAiDialogue.command'
import { GetAiDialogueVisualsCommand } from 'features/aiDialogue/GetAiDialogueVisuals.command'
import { GetUserDialoguesCommand } from 'features/aiDialogue/GetUserDialogues.command'
import { CheckAiDialogueUserMessageCommand } from 'features/aiDialogue/messageCheck/CheckAiDialogueUserMessage.command'
import { OpenAiDialogueStreamCommand } from 'features/aiDialogue/OpenAiDialogueStream.command'
import { UpdateAiDialogueCommand } from 'features/aiDialogue/UpdateAiDialogue.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { AiDialogueAudioOutModel } from 'models/aiDialogue/aiDialogueAudio.out.model'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { AiDialogueUserMessageCheckOutModel } from 'models/aiDialogue/aiDialogueUserMessageCheck.out.model'
import { AiDialogueVisualsOutModel } from 'models/aiDialogue/aiDialogueVisuals.out.model'
import { CheckAiDialogueUserMessageInput } from './inputs/checkAiDialogueUserMessage.input'
import { CreateAiDialogueInput } from './inputs/createAiDialogue.input'
import { CreateAiDialogueMessageInput } from './inputs/createAiDialogueMessage.input'
import { UpdateAiDialogueInput } from './inputs/updateAiDialogue.input'
import {
	ApiCreateAiDialogue,
	ApiCreateAiDialogueMessage,
	ApiDeleteAiDialogue,
	ApiGetAiDialogue,
	ApiGetAiDialogueAudio,
	ApiGetAiDialogues,
	ApiGetAiDialogueVisuals,
	ApiUpdateAiDialogue,
	ApiCheckAiDialogueUserMessage,
} from './openAPI.decorators'

@ApiTags('AiDialogue')
@Controller('ai-dialogue')
export class AiDialogueController {
	constructor(private commandBus: CommandBus) {}

	@ApiCheckAiDialogueUserMessage()
	@UseGuards(CheckSessionCookieGuard)
	@Header('Cache-Control', 'private, no-store')
	@HttpCode(HttpStatus.OK)
	@Post(':id/check-message')
	async checkAiDialogueMessage(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CheckAiDialogueUserMessageInput,
		@Req() request: Request,
	): Promise<AiDialogueUserMessageCheckOutModel> {
		return this.commandBus.execute(
			new CheckAiDialogueUserMessageCommand({
				userId: request.user!.id,
				dialogueId: id,
				speech: input.speech,
				action: input.action,
			}),
		)
	}

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
				maxCefrLevel: input.maxCefrLevel,
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

	@ApiGetAiDialogue()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getAiDialogue(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<AiDialogueOutModel> {
		return await this.commandBus.execute(new GetAiDialogueCommand(request.user!.id, id))
	}

	@ApiUpdateAiDialogue()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	async updateAiDialogue(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateAiDialogueInput,
		@Req() request: Request,
	): Promise<AiDialogueOutModel> {
		return await this.commandBus.execute(
			new UpdateAiDialogueCommand({
				userId: request.user!.id,
				dialogueId: id,
				maxCefrLevel: input.maxCefrLevel,
			}),
		)
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

	@ApiGetAiDialogueAudio()
	@UseGuards(CheckSessionCookieGuard)
	@Header('Cache-Control', 'private, no-store')
	@Get(':id/audio')
	async getAiDialogueAudio(
		@Param('id', ParseIntPipe) id: number,
		@Req() request: Request,
	): Promise<AiDialogueAudioOutModel> {
		return this.commandBus.execute(new GetAiDialogueAudioCommand(request.user!.id, id))
	}

	@ApiGetAiDialogueVisuals()
	@UseGuards(CheckSessionCookieGuard)
	@Header('Cache-Control', 'private, no-store')
	@Get(':id/visuals')
	async getAiDialogueVisuals(
		@Param('id', ParseIntPipe) id: number,
		@Req() request: Request,
	): Promise<AiDialogueVisualsOutModel> {
		return this.commandBus.execute(new GetAiDialogueVisualsCommand(request.user!.id, id))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Sse(':id/stream')
	stream(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<Observable<MessageEvent>> {
		return this.commandBus.execute(new OpenAiDialogueStreamCommand(request.user!.id, id))
	}
}
