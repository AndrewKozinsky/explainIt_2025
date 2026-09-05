import type { AiDialoguePreviewActionItem, AiDialoguePreviewEvent } from '@/entities/aiDialogue/types/aiDialoguePreview'

type TextEventType = 'sceneUpdate' | 'help' | 'worldEvent'

// Заголовок блока: npcActions — с полями через |, текстовые события — без полей.
type Header =
	| { type: TextEventType }
	| { type: 'npcActions'; npcId: string; npcName: string; npcRole: string; emotion: string }

// Что ожидается следующей строкой внутри текущего блока.
type Stage = 'label' | 'content' | 'translation'

type ParseState = {
	events: AiDialoguePreviewEvent[]
	current: AiDialoguePreviewEvent | null
	stage: Stage
}

/**
 * Разбирает накопленный (частичный) текст ответа LLM в превью-события.
 *
 * LLM отвечает плоским построчным текстом (см. parseAiDialogueEvents на сервере):
 * ход = блоки, разделённые пустой строкой; блок = заголовок + поля по одной строке.
 * Во время стрима текст дописывается посимвольно, поэтому последняя строка без
 * завершающего `\n` трактуется как «дописываемый» content/translation текущего блока
 * и подставляется в превью — так реплика растёт по мере генерации.
 *
 * Парсер толерантный: не бросает, недостающие поля просто отсутствуют
 * (см. AiDialoguePreviewEvent). Возвращает `null`, если пока нечего показать.
 */
export function parseAiDialoguePreview(raw: string): null | AiDialoguePreviewEvent[] {
	if (!raw.trim()) return null

	const lines = raw.split('\n').map(stripCarriageReturn)

	// Если ввод заканчивается переводом строки, все строки завершены; иначе
	// последняя строка ещё дописывается.
	const hasTerminator = raw.endsWith('\n')
	if (hasTerminator) lines.pop()

	const completeLines = hasTerminator ? lines : lines.slice(0, -1)
	const inProgressLine = hasTerminator ? null : lines.length > 0 ? lines[lines.length - 1] : null

	const { events, current, stage } = parseCompleteLines(completeLines)
	if (inProgressLine !== null) {
		applyInProgressLine(current, stage, inProgressLine)
	}

	const result = current ? [...events, current] : events
	return result.length > 0 ? result : null
}

function parseCompleteLines(lines: string[]): ParseState {
	const state: ParseState = { events: [], current: null, stage: 'label' }

	for (const line of lines) {
		if (line.trim() === '') {
			finalizeCurrent(state)
			continue
		}

		const header = parseHeader(line)
		if (header) {
			finalizeCurrent(state)
			state.current = buildEventFromHeader(header)
			state.stage = header.type === 'npcActions' ? 'label' : 'content'
			continue
		}

		applyLineToCurrent(state, line)
	}

	return state
}

function parseHeader(line: string): Header | null {
	const trimmed = line.trim()

	if (trimmed === 'sceneUpdate' || trimmed === 'help' || trimmed === 'worldEvent') {
		return { type: trimmed }
	}

	if (trimmed.startsWith('npcActions|')) {
		const parts = trimmed.split('|')
		return {
			type: 'npcActions',
			npcId: parts[1] ?? '',
			npcName: parts[2] ?? '',
			npcRole: parts[3] ?? '',
			emotion: parts[4] ?? '',
		}
	}

	return null
}

function buildEventFromHeader(header: Header): AiDialoguePreviewEvent {
	if (header.type === 'npcActions') {
		return {
			type: 'npcActions',
			npcId: header.npcId,
			npcName: header.npcName,
			npcRole: header.npcRole,
			emotion: header.emotion,
			actions: [],
		}
	}
	return { type: header.type }
}

function finalizeCurrent(state: ParseState): void {
	if (state.current) {
		state.events.push(state.current)
	}
	state.current = null
	state.stage = 'label'
}

function applyLineToCurrent(state: ParseState, line: string): void {
	const { current } = state
	if (!current) return

	if (current.type === 'npcActions') {
		const trimmed = line.trim()
		const isLabel = trimmed === 'action:' || trimmed === 'speech:'

		if (isLabel) {
			const actions = current.actions ?? []
			const action: AiDialoguePreviewActionItem = { type: trimmed === 'action:' ? 'action' : 'speech' }
			actions.push(action)
			current.actions = actions
			state.stage = 'content'
			return
		}

		if (state.stage === 'content') {
			setLastActionField(current, 'content', line)
			state.stage = 'translation'
			return
		}

		if (state.stage === 'translation') {
			setLastActionField(current, 'translation', line)
			state.stage = 'label'
			return
		}

		// stage === 'label', но строка не метка — пропускаем.
		return
	}

	// Текстовые события: заголовок → content → translation.
	if (state.stage === 'content') {
		current.content = line
		state.stage = 'translation'
	} else if (state.stage === 'translation') {
		current.translation = line
		state.stage = 'content'
	}
}

function setLastActionField(current: AiDialoguePreviewEvent, field: 'content' | 'translation', value: string): void {
	const actions = current.actions ?? []
	const last = actions[actions.length - 1]
	if (last) {
		last[field] = value
	}
}

function applyInProgressLine(current: AiDialoguePreviewEvent | null, stage: Stage, line: string): void {
	if (!current || !line) return

	if (current.type === 'npcActions') {
		if (stage === 'content') {
			setLastActionField(current, 'content', line)
		} else if (stage === 'translation') {
			setLastActionField(current, 'translation', line)
		}
		return
	}

	if (stage === 'content') {
		current.content = line
	} else if (stage === 'translation') {
		current.translation = line
	}
}

function stripCarriageReturn(line: string): string {
	return line.endsWith('\r') ? line.slice(0, -1) : line
}
