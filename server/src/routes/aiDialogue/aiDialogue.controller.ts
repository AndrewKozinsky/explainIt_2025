import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Header,
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
import { OpenAiDialogueStreamCommand } from 'features/aiDialogue/OpenAiDialogueStream.command'
import { AiDialogueClientEvent } from 'types/aiDialogueMessage'
import { CreateAiDialogueCommand } from 'features/aiDialogue/CreateAiDialogue.command'
import { CreateAiDialogueMessageCommand } from 'features/aiDialogue/CreateAiDialogueMessage.command'
import { DeleteAiDialogueCommand } from 'features/aiDialogue/DeleteAiDialogue.command'
import { GetAiDialogueCommand } from 'features/aiDialogue/GetAiDialogue.command'
import { GetUserDialoguesCommand } from 'features/aiDialogue/GetUserDialogues.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { CreateAiDialogueInput } from './inputs/createAiDialogue.input'
import { CreateAiDialogueMessageInput } from './inputs/createAiDialogueMessage.input'
import { GetAiDialogueVisualsCommand } from 'features/aiDialogue/GetAiDialogueVisuals.command'
import { AiDialogueVisualsOutModel } from 'models/aiDialogue/aiDialogueVisuals.out.model'
import {
	ApiCreateAiDialogue,
	ApiCreateAiDialogueMessage,
	ApiDeleteAiDialogue,
	ApiGetAiDialogue,
	ApiGetAiDialogues,
	ApiGetAiDialogueVisuals,
} from './openAPI.decorators'

@ApiTags('AiDialogue')
@Controller('ai-dialogue')
export class AiDialogueController {
	constructor(private commandBus: CommandBus) {}

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

	@ApiGetAiDialogue()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getAiDialogue(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<AiDialogueOutModel> {
		return await this.commandBus.execute(new GetAiDialogueCommand(request.user!.id, id))
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
