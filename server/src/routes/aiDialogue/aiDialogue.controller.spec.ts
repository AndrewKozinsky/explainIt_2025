jest.mock('@nestjs/common', () => {
	const decorators = [
		'Body',
		'Controller',
		'Delete',
		'Get',
		'Header',
		'HttpCode',
		'Param',
		'Patch',
		'Post',
		'Req',
		'Sse',
		'UseGuards',
		'Injectable',
	]
	return {
		...Object.fromEntries(decorators.map((name) => [name, () => () => undefined])),
		HttpStatus: { OK: 200, CREATED: 201 },
		ParseIntPipe: class {},
	}
})
jest.mock('@nestjs/swagger', () => ({ ApiTags: () => () => undefined }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('@nestjs/cqrs', () => ({ CommandBus: class {}, CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))
jest.mock('features/aiDialogue/GenerateAiDialogueTurn.service', () => ({ GenerateAiDialogueTurn: class {} }))
jest.mock('features/aiDialogue/CreateAiDialogue.command', () => ({ CreateAiDialogueCommand: class {} }))
jest.mock('features/aiDialogue/CreateAiDialogueMessage.command', () => ({ CreateAiDialogueMessageCommand: class {} }))
jest.mock('features/aiDialogue/DeleteAiDialogue.command', () => ({ DeleteAiDialogueCommand: class {} }))
jest.mock('features/aiDialogue/GetAiDialogue.command', () => ({ GetAiDialogueCommand: class {} }))
jest.mock('features/aiDialogue/GetUserDialogues.command', () => ({ GetUserDialoguesCommand: class {} }))
jest.mock('features/aiDialogue/messageCheck/CheckAiDialogueUserMessage.command', () => ({
	CheckAiDialogueUserMessageCommand: class {
		constructor(public dto: unknown) {}
	},
}))
jest.mock('infrastructure/guards/checkSessionCookie.guard', () => ({ CheckSessionCookieGuard: class {} }))
jest.mock('./inputs/createAiDialogue.input', () => ({ CreateAiDialogueInput: class {} }))
jest.mock('./inputs/checkAiDialogueUserMessage.input', () => ({ CheckAiDialogueUserMessageInput: class {} }))
jest.mock('./inputs/createAiDialogueMessage.input', () => ({ CreateAiDialogueMessageInput: class {} }))
jest.mock('./inputs/updateAiDialogue.input', () => ({ UpdateAiDialogueInput: class {} }))
jest.mock('./openAPI.decorators', () =>
	Object.fromEntries(
		[
			'ApiCheckAiDialogueUserMessage',
			'ApiCreateAiDialogue',
			'ApiCreateAiDialogueMessage',
			'ApiDeleteAiDialogue',
			'ApiGetAiDialogue',
			'ApiGetAiDialogues',
			'ApiGetAiDialogueVisuals',
			'ApiGetAiDialogueAudio',
			'ApiUpdateAiDialogue',
		].map((name) => [name, () => () => undefined]),
	),
)

import { CommandBus } from '@nestjs/cqrs'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { OpenAiDialogueStreamCommand } from 'features/aiDialogue/OpenAiDialogueStream.command'
import { AiDialogueController } from './aiDialogue.controller'

describe('AiDialogueController CQRS dispatch', () => {
	function harness() {
		const bus = { execute: jest.fn() }
		const controller = new AiDialogueController(bus as unknown as CommandBus)
		const request = { user: { id: 7 } } as unknown as Request

		return { controller, bus, request }
	}

	it('checks a draft with authenticated identity and forwards only the optional draft fields', async () => {
		const { controller, bus, request } = harness()
		const result = { speech: { critical: [], suggestions: [] }, action: { critical: [], suggestions: [] } }
		bus.execute.mockResolvedValue(result)

		await expect(controller.checkAiDialogueUserMessageText(1, { action: 'I smile.' }, request)).resolves.toBe(
			result,
		)

		expect(bus.execute).toHaveBeenCalledWith(
			expect.objectContaining({
				dto: { userId: 7, dialogueId: 1, speech: undefined, action: 'I smile.' },
			}),
		)
	})

	it('passes authenticated identity and dialogue ID to the visual command', async () => {
		const { controller, bus, request } = harness()
		bus.execute.mockResolvedValue({ dialogueId: 1 })
		await expect(controller.getAiDialogueVisuals(1, request)).resolves.toEqual({ dialogueId: 1 })

		expect(bus.execute).toHaveBeenCalledWith(expect.objectContaining({ userId: 7, dialogueId: 1 }))
	})

	it('dispatches a settings update with the authenticated owner and explicit null', async () => {
		const { controller, bus, request } = harness()
		bus.execute.mockResolvedValue({ id: 1, maxCefrLevel: null })

		await expect(controller.updateAiDialogue(1, { maxCefrLevel: null }, request)).resolves.toEqual({
			id: 1,
			maxCefrLevel: null,
		})

		expect(bus.execute).toHaveBeenCalledWith(
			expect.objectContaining({ dto: { userId: 7, dialogueId: 1, maxCefrLevel: null } }),
		)
	})

	it('dispatches stream opening through CommandBus and returns its Observable unchanged', async () => {
		const { controller, bus, request } = harness()
		const stream = new Observable()

		bus.execute.mockResolvedValue(stream)

		await expect(controller.stream(1, request)).resolves.toBe(stream)

		expect(bus.execute).toHaveBeenCalledWith(new OpenAiDialogueStreamCommand(7, 1))
	})

	it('propagates command dispatch errors without opening another stream', async () => {
		const { controller, bus, request } = harness()
		bus.execute.mockRejectedValue(new Error('dispatch failed'))
		await expect(controller.stream(1, request)).rejects.toThrow('dispatch failed')
		expect(bus.execute).toHaveBeenCalledTimes(1)
	})
})
