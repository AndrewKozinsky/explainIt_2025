import type { DictationCallbacks, DictationSession } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import type { UserMessagePart } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import type { AiDialogueActionItem } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { SendAiDialogueMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import {
	canSendDraft,
	createDraftPart,
	type DialogueDraftState,
	type DraftErrorKey,
	type DraftPart,
	type DraftSelection,
	insertDictation,
	MAX_DRAFT_LENGTH,
} from './aiDialogueDraftState'

type Dependencies = {
	openDictation(callbacks: DictationCallbacks): DictationSession
	send: SendAiDialogueMessage
}

type ActiveDictation = {
	part: UserMessagePart
	original: string
	selection: DraftSelection
	committed: string
	session?: DictationSession
}

/** Независимые черновики двух вкладок; один микрофон на форму. */
export class AiDialogueDraftController {
	private state: DialogueDraftState = {
		activePart: 'speech',
		parts: { speech: createDraftPart(), action: createDraftPart() },
		dictation: null,
		sending: false,
		submitError: null,
		blocked: false,
	}
	private listeners = new Set<() => void>()
	private replyRequestId?: string
	private leaveRequestId?: string
	private dictation: ActiveDictation | null = null
	private disposed = false

	constructor(private dependencies: Dependencies) {}

	getSnapshot = () => this.state

	subscribe = (listener: () => void) => {
		this.listeners.add(listener)
		return () => {
			this.listeners.delete(listener)
		}
	}
	activate() {
		this.disposed = false
	}

	dispose() {
		this.cancelDictation()
		this.disposed = true
	}

	setBlocked(blocked: boolean) {
		if (blocked === this.state.blocked) return

		if (blocked) this.cancelDictation()
		this.update({ blocked })
	}

	selectPart(part: UserMessagePart) {
		if (this.state.dictation || this.state.sending || this.state.blocked) return
		this.update({ activePart: part })
	}

	rememberSelection(part: UserMessagePart, selection: DraftSelection) {
		if (this.state.dictation) return

		const current = this.state.parts[part]
		if (current.selection.start === selection.start && current.selection.end === selection.end) return

		this.updatePart(part, { selection })
	}

	edit(part: UserMessagePart, text: string, selection?: DraftSelection) {
		if (this.state.blocked || this.state.sending || this.state.dictation) return
		if (text.length > MAX_DRAFT_LENGTH) return
		this.writeText(part, text, selection ?? { start: text.length, end: text.length })
	}

	startDictation() {
		const part = this.state.activePart
		const current = this.state.parts[part]
		if (this.state.dictation || this.state.blocked || this.state.sending) return

		const context: ActiveDictation = { part, original: current.text, selection: current.selection, committed: '' }
		this.dictation = context
		this.updatePart(part, { error: null })
		this.update({ dictation: { part, phase: 'starting' } })

		try {
			const session = this.dependencies.openDictation({
				onRecordingStream: (stream) => {
					if (this.dictation === context && this.state.dictation) {
						this.update({ dictation: { ...this.state.dictation, stream } })
					}
				},
				onPhase: (phase) => {
					if (this.dictation === context)
						this.update({
							dictation: {
								part,
								phase,
								stream: phase === 'recording' ? this.state.dictation?.stream : undefined,
							},
						})
				},
				onText: (committed, provisional) => this.receiveDictation(context, committed, provisional),
				onDone: (text) => this.finishDictation(context, text),
				onError: (error) => this.finishDictation(context, context.committed, error),
			})

			context.session = session
			if (this.dictation !== context) session.cancel()
		} catch {
			this.finishDictation(context, '', 'dictationStartFailed')
		}
	}

	stopDictation() {
		if (this.state.dictation?.phase === 'starting') return this.cancelDictation()
		if (this.state.dictation?.phase !== 'recording') return
		this.update({ dictation: { ...this.state.dictation, phase: 'finishing', stream: undefined } })
		this.dictation?.session?.stop()
	}

	cancelDictation() {
		if (this.dictation) this.finishDictation(this.dictation, this.dictation.committed)
	}

	async send() {
		if (!canSendDraft(this.state) || this.disposed) return

		const actions: AiDialogueActionItem[] = []

		for (const type of ['speech', 'action'] as const) {
			const content = this.state.parts[type].text.trim()
			if (content) actions.push({ type, content })
		}

		await this.submit(() => {
			this.replyRequestId ??= crypto.randomUUID()
			return this.dependencies.send({ type: 'userActions', actions, requestId: this.replyRequestId })
		})
	}

	async leave() {
		if (this.state.blocked || this.state.sending || this.disposed) return
		this.cancelDictation()

		await this.submit(() => {
			this.leaveRequestId ??= crypto.randomUUID()
			return this.dependencies.send({ type: 'userAvoidsNPC', requestId: this.leaveRequestId })
		})
	}

	private async submit(request: () => Promise<string | null>) {
		this.update({ sending: true, submitError: null })
		try {
			const error = await request()
			if (this.disposed) return

			if (error !== null) {
				this.update({ submitError: { message: error } })
				return
			}

			this.replyRequestId = undefined
			this.leaveRequestId = undefined
			this.update({ parts: { speech: createDraftPart(), action: createDraftPart() } })
		} catch {
			if (!this.disposed) this.update({ submitError: {} })
		} finally {
			if (!this.disposed) this.update({ sending: false })
		}
	}

	private receiveDictation(context: ActiveDictation, committed: string, provisional: string) {
		if (this.dictation !== context || this.disposed) return
		const transcript = committed + provisional
		const text = transcript ? insertDictation(context.original, context.selection, transcript) : context.original
		if (text.length > MAX_DRAFT_LENGTH) {
			this.finishDictation(context, context.committed, 'dictationTextLimit')
			return
		}
		context.committed = committed
		const selection = transcript
			? { start: context.selection.start, end: context.selection.start + transcript.length }
			: context.selection
		this.writeText(context.part, text, selection)
	}

	private finishDictation(context: ActiveDictation, text: string, error: DraftErrorKey | null = null) {
		if (this.dictation !== context) return
		this.dictation = null
		context.session?.cancel()
		const result = text ? insertDictation(context.original, context.selection, text) : context.original
		if (result.length > MAX_DRAFT_LENGTH) {
			return this.finishOversizedDictation(context)
		}
		const cursor = text ? context.selection.start + text.length : context.selection.end
		this.writeText(context.part, result, { start: cursor, end: cursor })
		this.updatePart(context.part, { error })
		this.update({ dictation: null })
	}

	private finishOversizedDictation(context: ActiveDictation) {
		this.writeText(context.part, context.original, context.selection)
		this.updatePart(context.part, { error: 'textTooLong' })
		this.update({ dictation: null })
	}

	private writeText(part: UserMessagePart, text: string, selection: DraftSelection) {
		if (text.trim() !== this.state.parts[part].text.trim()) {
			this.replyRequestId = undefined
			this.update({ submitError: null })
		}
		this.updatePart(part, { text, selection, error: null })
	}

	private updatePart(part: UserMessagePart, value: Partial<DraftPart>) {
		this.update({ parts: { ...this.state.parts, [part]: { ...this.state.parts[part], ...value } } })
	}

	private update(value: Partial<DialogueDraftState>) {
		this.state = { ...this.state, ...value }
		if (!this.disposed) this.listeners.forEach((listener) => listener())
	}
}
