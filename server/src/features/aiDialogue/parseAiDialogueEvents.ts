import { AiDialogueEvent, AiDialogueNpcActionItem } from 'types/aiDialogueMessage'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

// Типы событий, которые генерирует LLM. Пользовательские userActions/userAvoidsNPC
// сюда не приходят — их создаёт клиент, а не LLM.
type TextEventType = 'sceneUpdate' | 'help' | 'worldEvent'

/**
 * Разбирает накопленный текст ответа LLM в список событий диалога.
 *
 * LLM отвечает плоским построчным текстом (responseFormat: text): один ход = один
 * или несколько блоков, разделённых пустой строкой; блок = строка-заголовок + поля
 * по одной строке (для npcActions — тройки `метка:` / content / translation).
 * Строгий авторитетный разбор — при невалидной структуре бросаем cannotParseLlmResponse.
 */
export function parseAiDialogueEvents(raw: string): AiDialogueEvent[] {
	const text = raw.trim()
	if (!text) return []

	const lines = text.split('\n').map(stripCarriageReturn)
	return splitIntoBlocks(lines).map(parseBlock)
}

// Делит поток строк на блоки по пустым строкам. Пустая строка — только граница
// между блоками: content и translation всегда ровно одна непустая строка.
function splitIntoBlocks(lines: string[]): string[][] {
	const blocks: string[][] = []
	let current: string[] = []

	for (const line of lines) {
		if (line.trim() === '') {
			if (current.length) {
				blocks.push(current)
				current = []
			}
		} else {
			current.push(line)
		}
	}

	if (current.length) blocks.push(current)
	return blocks
}

function parseBlock(block: string[]): AiDialogueEvent {
	const header = block[0].trim()
	const type = header.split('|')[0].trim()

	if (type === 'npcActions') {
		return parseNpcActions(block)
	}

	if (type === 'sceneUpdate' || type === 'help' || type === 'worldEvent') {
		return parseTextEvent(type, block)
	}

	throw cannotParse()
}

function parseTextEvent(type: TextEventType, block: string[]): AiDialogueEvent {
	// Блок: [заголовок, content, translation].
	if (block.length !== 3) throw cannotParse()

	const content = block[1]
	const translation = block[2]

	if (type === 'sceneUpdate') return { type, content, translation }
	if (type === 'help') return { type, content, translation }
	return { type, content, translation }
}

function parseNpcActions(block: string[]): AiDialogueEvent {
	const parts = block[0].trim().split('|')
	if (parts.length !== 5 || parts.some((part) => part.trim() === '')) throw cannotParse()

	const [, npcId, npcName, npcRole, emotion] = parts

	// После заголовка идут тройки: метка (action:/speech:) / content / translation.
	const body = block.slice(1)
	if (body.length === 0 || body.length % 3 !== 0) throw cannotParse()

	const actions: AiDialogueNpcActionItem[] = []
	for (let i = 0; i < body.length; i += 3) {
		const label = body[i].trim()
		if (label !== 'action:' && label !== 'speech:') throw cannotParse()

		actions.push({
			type: label === 'action:' ? 'action' : 'speech',
			content: body[i + 1],
			translation: body[i + 2],
		})
	}

	return { type: 'npcActions', npcId, npcName, npcRole, emotion, actions }
}

function stripCarriageReturn(line: string): string {
	return line.endsWith('\r') ? line.slice(0, -1) : line
}

function cannotParse(): CustomError {
	return new CustomError(errorMessage.aiDialogue.cannotParseLlmResponse, ErrorStatusCode.InternalServerError_500)
}
