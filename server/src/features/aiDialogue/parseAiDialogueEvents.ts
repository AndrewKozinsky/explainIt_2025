import {
	AiDialogueEmotion,
	aiDialogueEmotions,
	AiDialogueEvent,
	AiDialogueNpcActionItem,
	AiDialogueSceneVisualMetadata,
	ParsedAiDialogueTurn,
} from 'types/aiDialogueMessage'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

type TextEventType = 'sceneUpdate' | 'help' | 'worldEvent'
type ParsedBlock = {
	event: AiDialogueEvent | null
	npcAppearance: null | { npcId: string; appearance: string }
	scene: null | Omit<AiDialogueSceneVisualMetadata, 'eventIndex'>
}

const EMPTY_BLOCK: ParsedBlock = { event: null, npcAppearance: null, scene: null }

/** Разбирает подтверждённый построчный ответ LLM на сюжетные события и визуальные метаданные. */
export function parseAiDialogueEvents(raw: string): ParsedAiDialogueTurn {
	const text = raw.trim()
	if (!text) return emptyTurn()

	const blocks = splitIntoBlocks(text.split('\n').map(stripCarriageReturn)).map(parseBlock)
	const events: AiDialogueEvent[] = []
	const npcAppearances: ParsedAiDialogueTurn['visualMetadata']['npcAppearances'] = []
	const scenes: AiDialogueSceneVisualMetadata[] = []

	for (const block of blocks) {
		if (block.event) {
			const eventIndex = events.length
			events.push(block.event)
			if (block.scene) scenes.push({ eventIndex, ...block.scene })
		}
		if (block.npcAppearance) npcAppearances.push(block.npcAppearance)
	}

	if (events.length === 0) throw cannotParse()
	return { events, visualMetadata: { npcAppearances, scenes } }
}

function emptyTurn(): ParsedAiDialogueTurn {
	return { events: [], visualMetadata: { npcAppearances: [], scenes: [] } }
}

function splitIntoBlocks(lines: string[]): string[][] {
	const blocks: string[][] = []
	let current: string[] = []
	for (const line of lines) {
		if (line.trim() === '') {
			if (current.length) blocks.push(current)
			current = []
		} else current.push(line)
	}
	if (current.length) blocks.push(current)
	return blocks
}

function parseBlock(block: string[]): ParsedBlock {
	const header = block[0].trim()
	const type = header.split('|')[0].trim()
	if (type === 'npcActions') return parseNpcActions(block)
	if (type === 'sceneUpdate' || type === 'help' || type === 'worldEvent') return parseTextEvent(type, block)
	return EMPTY_BLOCK
}

function parseTextEvent(type: TextEventType, block: string[]): ParsedBlock {
	if (block.length < 2) return EMPTY_BLOCK
	const content = block[1]
	const translationCandidate = block[2] ?? ''
	const translation = isVisualField(translationCandidate) ? '' : translationCandidate
	const event: AiDialogueEvent = { type, content, translation }
	if (type !== 'sceneUpdate') return { ...EMPTY_BLOCK, event }

	const participantLine = block.find((line) => line.trim().startsWith('participants:'))
	const visualLine = block.find((line) => line.trim().startsWith('visual:'))
	const participantNpcIds = (participantLine?.trim().slice('participants:'.length) ?? '')
		.split(',')
		.map((value) => value.trim())
		.filter(Boolean)
	const visualDescription = visualLine?.trim().slice('visual:'.length).trim() || content
	return { ...EMPTY_BLOCK, event, scene: { participantNpcIds, visualDescription } }
}

function parseNpcActions(block: string[]): ParsedBlock {
	const [, npcId = '', npcName = '', npcRole = '', rawEmotion = ''] = block[0].trim().split('|')
	const actions = parseNpcActionItems(block.slice(1))
	if (actions.length === 0) return EMPTY_BLOCK

	const appearanceIndex = block.findIndex((line) => line.trim() === 'appearance:')
	const appearance = appearanceIndex >= 0 ? (block[appearanceIndex + 1]?.trim() ?? '') : ''
	const event: AiDialogueEvent = {
		type: 'npcActions',
		npcId,
		npcName,
		npcRole,
		emotion: normalizeEmotion(rawEmotion),
		actions,
	}
	return { ...EMPTY_BLOCK, event, npcAppearance: appearance ? { npcId, appearance } : null }
}

function parseNpcActionItems(body: string[]): AiDialogueNpcActionItem[] {
	const actions: AiDialogueNpcActionItem[] = []
	for (let i = 0; i < body.length; i += 1) {
		const label = body[i].trim()
		if (label !== 'action:' && label !== 'speech:') continue
		const content = body[i + 1] && !isLabel(body[i + 1]) ? body[i + 1] : ''
		if (!content) continue
		const translation = body[i + 2] && !isLabel(body[i + 2]) ? body[i + 2] : ''
		actions.push({ type: label === 'action:' ? 'action' : 'speech', content, translation })
	}
	return actions
}

export function normalizeAiDialogueEmotion(value: null | string | undefined): AiDialogueEmotion {
	return normalizeEmotion(value)
}

function normalizeEmotion(value: null | string | undefined): AiDialogueEmotion {
	const normalized = value?.trim().toLowerCase()
	return aiDialogueEmotions.find((emotion) => emotion === normalized) ?? 'neutral'
}

function isLabel(line: string): boolean {
	const value = line.trim()
	return value === 'action:' || value === 'speech:' || value === 'appearance:' || isVisualField(value)
}

function isVisualField(line: string): boolean {
	const value = line.trim()
	return value.startsWith('participants:') || value.startsWith('visual:')
}

function stripCarriageReturn(line: string): string {
	return line.endsWith('\r') ? line.slice(0, -1) : line
}

function cannotParse(): CustomError {
	return new CustomError(errorMessage.aiDialogue.cannotParseLlmResponse, ErrorStatusCode.InternalServerError_500)
}
