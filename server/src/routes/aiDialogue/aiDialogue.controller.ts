import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { CreateAiDialogueCommand } from 'features/aiDialogue/CreateAiDialogue.command'
import { DeleteAiDialogueCommand } from 'features/aiDialogue/DeleteAiDialogue.command'
import { GetUserDialoguesCommand } from 'features/aiDialogue/GetUserDialogues.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { CreateAiDialogueInput } from './inputs/createAiDialogue.input'
import { ApiCreateAiDialogue, ApiDeleteAiDialogue, ApiGetAiDialogues } from './openAPI.decorators'

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
}
