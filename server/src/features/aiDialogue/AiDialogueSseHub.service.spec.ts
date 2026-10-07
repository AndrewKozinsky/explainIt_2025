jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { AiDialogueSseHub } from './AiDialogueSseHub.service'

describe('AiDialogueSseHub', () => {
	it('reuses a subject within the same dialogue and isolates different dialogues', () => {
		const hub = new AiDialogueSseHub()
		expect(hub.getDialogueEventSubject(1)).toBe(hub.getDialogueEventSubject(1))
		expect(hub.getDialogueEventSubject(1)).not.toBe(hub.getDialogueEventSubject(2))
	})
	it('publishes only to the selected dialogue without replaying past events', () => {
		const hub = new AiDialogueSseHub()
		const first = jest.fn()
		const second = jest.fn()
		hub.publishDialogueEvent(1, { data: { type: 'turnStarted' } })
		const a = hub.getDialogueEventSubject(1).subscribe(first)
		const b = hub.getDialogueEventSubject(2).subscribe(second)
		expect(first).not.toHaveBeenCalled()
		hub.publishDialogueEvent(1, { data: { type: 'turnDone' } })
		expect(first).toHaveBeenCalledWith({ data: { type: 'turnDone' } })
		expect(second).not.toHaveBeenCalled()
		a.unsubscribe()
		b.unsubscribe()
	})
	it('sends visual refresh hints only to active dialogues', () => {
		const hub = new AiDialogueSseHub()
		const active = jest.fn()
		const idleSubject = hub.getDialogueEventSubject(2)
		const idleNext = jest.spyOn(idleSubject, 'next')
		const subscription = hub.getDialogueEventSubject(1).subscribe(active)
		hub.notifyActiveDialoguesOfVisualChanges()
		expect(active).toHaveBeenCalledWith({ data: { type: 'visualsChanged', dialogueId: 1 } })
		expect(idleNext).not.toHaveBeenCalled()
		subscription.unsubscribe()
	})
})
