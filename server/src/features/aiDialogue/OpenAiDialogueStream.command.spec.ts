jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))
jest.mock('./GenerateAiDialogueTurn.service', () => ({ GenerateAiDialogueTurn: class {} }))

import { OpenAiDialogueStreamCommand, OpenAiDialogueStreamHandler } from './OpenAiDialogueStream.command'
import { AiDialogueSseHub } from './AiDialogueSseHub.service'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { GenerateAiDialogueTurn } from './GenerateAiDialogueTurn.service'

function harness() {
	let authorize!: (dialogue: unknown) => void
	const repository = {
		getDialogueById: jest.fn(
			() =>
				new Promise((resolve) => {
					authorize = resolve
				}),
		),
	}
	const query = { getMessagesByDialogueId: jest.fn().mockResolvedValue([]) }
	const generation = { triggerIfNeeded: jest.fn() }
	const hub = new AiDialogueSseHub()
	const handler = new OpenAiDialogueStreamHandler(
		repository as unknown as AiDialogueRepository,
		query as unknown as AiDialogueQueryRepository,
		hub,
		generation as unknown as GenerateAiDialogueTurn,
	)
	return { handler, hub, repository, query, generation, authorize: (dialogue: unknown) => authorize(dialogue) }
}

async function settle() {
	for (let index = 0; index < 6; index += 1) await Promise.resolve()
}

describe('OpenAiDialogueStreamHandler', () => {
	it('returns a cold stream without opening subscriptions or reading DB during command dispatch', async () => {
		const { handler, repository, hub } = harness()
		await handler.execute(new OpenAiDialogueStreamCommand(7, 1))
		expect(repository.getDialogueById).not.toHaveBeenCalled()
		expect(hub.getDialogueEventSubject(1).observed).toBe(false)
	})
	it.each([null, { user_id: 8 }])('holds events until rejecting owner %s', async (dialogue) => {
		const { handler, hub, authorize, query } = harness()
		const next = jest.fn()
		const error = jest.fn()
		const stream = await handler.execute(new OpenAiDialogueStreamCommand(7, 1))
		stream.subscribe({ next, error })
		hub.publishDialogueEvent(1, { data: { type: 'visualsChanged', dialogueId: 1 } })
		hub.publishDialogueEvent(1, { data: { type: 'chunk', chunk: 'private text' } })
		expect(next).not.toHaveBeenCalled()
		authorize(dialogue)
		await settle()
		expect(error).toHaveBeenCalledWith(expect.objectContaining({ statusCode: dialogue ? 403 : 404 }))
		expect(next).not.toHaveBeenCalled()
		expect(query.getMessagesByDialogueId).not.toHaveBeenCalled()
		expect(hub.getDialogueEventSubject(1).observed).toBe(false)
	})
	it('flushes authorized events, avoids replay duplicates and triggers the first turn', async () => {
		const { handler, hub, authorize, query, generation } = harness()
		const message = { id: 3, dialogueId: 1, payload: { type: 'sceneUpdate' } }
		query.getMessagesByDialogueId.mockResolvedValue([message])
		const next = jest.fn()
		const stream = await handler.execute(new OpenAiDialogueStreamCommand(7, 1))
		const subscription = stream.subscribe(next)
		hub.publishDialogueEvent(1, { data: { type: 'message', message } })
		expect(next).not.toHaveBeenCalled()
		authorize({ user_id: 7 })
		await settle()
		expect(next.mock.calls.map(([event]) => event.data.type)).toEqual(['message', 'visualsChanged'])
		expect(generation.triggerIfNeeded).toHaveBeenCalledWith(1)
		hub.publishDialogueEvent(1, { data: { type: 'visualsChanged', dialogueId: 1 } })
		expect(next).toHaveBeenCalledTimes(3)
		subscription.unsubscribe()
		expect(hub.getDialogueEventSubject(1).observed).toBe(false)
	})
	it('does not replay or trigger after disconnect during ownership lookup', async () => {
		const { handler, authorize, query, generation } = harness()
		const stream = await handler.execute(new OpenAiDialogueStreamCommand(7, 1))
		const subscription = stream.subscribe()
		subscription.unsubscribe()
		authorize({ user_id: 7 })
		await settle()
		expect(query.getMessagesByDialogueId).not.toHaveBeenCalled()
		expect(generation.triggerIfNeeded).not.toHaveBeenCalled()
	})
	it('propagates replay errors to SSE and releases the hub subscription', async () => {
		const { handler, authorize, query, hub, generation } = harness()
		query.getMessagesByDialogueId.mockRejectedValue(new Error('DB offline'))
		const error = jest.fn()
		const stream = await handler.execute(new OpenAiDialogueStreamCommand(7, 1))
		stream.subscribe({ error })
		authorize({ user_id: 7 })
		await settle()
		expect(error).toHaveBeenCalledWith(expect.objectContaining({ message: 'DB offline' }))
		expect(hub.getDialogueEventSubject(1).observed).toBe(false)
		expect(generation.triggerIfNeeded).not.toHaveBeenCalled()
	})
})
