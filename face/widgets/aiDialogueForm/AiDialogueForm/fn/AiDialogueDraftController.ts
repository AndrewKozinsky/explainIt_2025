import type { DictationCallbacks, DictationSession } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import type { UserMessageCheck, UserMessagePart } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { AiDialogueActionItem } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import {
	canSendDraft,
	createDraftPart,
	type DialogueDraftState,
	type DraftPart,
	type DraftSelection,
	insertDictation,
	MAX_DRAFT_LENGTH,
} from './aiDialogueDraftState'

type Dependencies = {
	check(part: UserMessagePart, text: string, signal: AbortSignal): Promise<ApiResult<UserMessageCheck>>
	openDictation(callbacks: DictationCallbacks): DictationSession
	send(actions: AiDialogueActionItem[]): Promise<boolean>
	leave(): Promise<boolean>
}

type ActiveDictation = {
	part: UserMessagePart
	original: string
	selection: DraftSelection
	committed: string
	session?: DictationSession
}

/** Независимые черновики и проверки двух вкладок; один микрофон на форму. */
export class AiDialogueDraftController {
	private state: DialogueDraftState = {
		activePart: 'speech',
		parts: { speech: createDraftPart(), action: createDraftPart() },
		dictation: null,
		sending: false,
		blocked: false,
	}
	private listeners = new Set<() => void>()
	private checks = new Map<UserMessagePart, AbortController>()
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
		this.cancelChecks()
		this.disposed = true
	}

	setBlocked(blocked: boolean) {
		if (blocked === this.state.blocked) return
		if (blocked) {
			this.cancelDictation()
			this.cancelChecks()
		}
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
		if (this.state.blocked || this.state.sending || this.state.dictation || this.state.parts[part].checking) return
		if (text.length > MAX_DRAFT_LENGTH) return
		this.writeText(part, text, selection ?? { start: text.length, end: text.length })
	}

	async checkActivePart() {
		const part = this.state.activePart
		const current = this.state.parts[part]
		if (
			!current.text.trim() ||
			current.checking ||
			this.state.dictation ||
			this.state.blocked ||
			this.state.sending
		)
			return
		const request = new AbortController()
		this.checks.set(part, request)
		this.updatePart(part, { checking: true, error: null, review: null })

		try {
			const response = await this.dependencies.check(part, current.text, request.signal)

			if (!this.acceptsCheck(part, request, current.revision)) return
			if (response.error || response.errors?.length || !response.data?.[part]) throw new Error('Check failed')

			this.updatePart(part, {
				review: { revision: current.revision, result: response.data[part] },
				checking: false,
			})
		} catch {
			if (this.acceptsCheck(part, request, current.revision)) {
				this.updatePart(part, { checking: false, error: 'Не удалось проверить текст.' })
			}
		} finally {
			if (this.checks.get(part) === request) this.checks.delete(part)
		}
	}

	startDictation() {
		const part = this.state.activePart
		const current = this.state.parts[part]
		if (current.checking || this.state.dictation || this.state.blocked || this.state.sending) return
		const context: ActiveDictation = { part, original: current.text, selection: current.selection, committed: '' }
		this.dictation = context
		this.updatePart(part, { error: null })
		this.update({ dictation: { part, phase: 'starting' } })

		try {
			const session = this.dependencies.openDictation({
				onPhase: (phase) => {
					if (this.dictation === context) this.update({ dictation: { part, phase } })
				},
				onText: (committed, provisional) => this.receiveDictation(context, committed, provisional),
				onDone: (text) => this.finishDictation(context, text),
				onError: (error) => this.finishDictation(context, context.committed, error),
			})
			context.session = session
			if (this.dictation !== context) session.cancel()
		} catch {
			this.finishDictation(context, '', 'Не удалось начать диктовку.')
		}
	}

	stopDictation() {
		if (this.state.dictation?.phase === 'starting') return this.cancelDictation()
		if (this.state.dictation?.phase !== 'recording') return
		this.update({ dictation: { ...this.state.dictation, phase: 'finishing' } })
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
		await this.submit(() => this.dependencies.send(actions))
	}

	async leave() {
		if (this.state.blocked || this.state.sending || this.disposed) return
		this.cancelDictation()
		this.cancelChecks()
		await this.submit(() => this.dependencies.leave())
	}

	private async submit(request: () => Promise<boolean>) {
		this.update({ sending: true })
		try {
			if ((await request()) && !this.disposed) {
				this.update({ parts: { speech: createDraftPart(), action: createDraftPart() } })
			}
		} catch {
			if (!this.disposed)
				this.updatePart(this.state.activePart, { error: 'Не удалось отправить ответ. Попробуйте ещё раз.' })
		} finally {
			if (!this.disposed) this.update({ sending: false })
		}
	}

	private receiveDictation(context: ActiveDictation, committed: string, provisional: string) {
		if (this.dictation !== context || this.disposed) return
		const transcript = committed + provisional
		const text = transcript ? insertDictation(context.original, context.selection, transcript) : context.original
		if (text.length > MAX_DRAFT_LENGTH) {
			this.finishDictation(
				context,
				context.committed,
				'Достигнут лимит 4000 символов. Последний фрагмент не добавлен.',
			)
			return
		}
		context.committed = committed
		const selection = transcript
			? { start: context.selection.start, end: context.selection.start + transcript.length }
			: context.selection
		this.writeText(context.part, text, selection)
	}

	private finishDictation(context: ActiveDictation, text: string, error: string | null = null) {
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
		this.updatePart(context.part, { error: 'Текст не должен превышать 4000 символов.' })
		this.update({ dictation: null })
	}

	private acceptsCheck(part: UserMessagePart, request: AbortController, revision: number) {
		return (
			!this.disposed &&
			!request.signal.aborted &&
			this.checks.get(part) === request &&
			this.state.parts[part].revision === revision
		)
	}

	private cancelChecks() {
		for (const [part, request] of this.checks) {
			request.abort()
			this.updatePart(part, { checking: false })
		}
		this.checks.clear()
	}

	private writeText(part: UserMessagePart, text: string, selection: DraftSelection) {
		const current = this.state.parts[part]
		this.updatePart(part, {
			text,
			selection,
			revision: current.revision + (text !== current.text ? 1 : 0),
			error: null,
		})
	}

	private updatePart(part: UserMessagePart, value: Partial<DraftPart>) {
		this.update({ parts: { ...this.state.parts, [part]: { ...this.state.parts[part], ...value } } })
	}

	private update(value: Partial<DialogueDraftState>) {
		this.state = { ...this.state, ...value }
		if (!this.disposed) this.listeners.forEach((listener) => listener())
	}
}
