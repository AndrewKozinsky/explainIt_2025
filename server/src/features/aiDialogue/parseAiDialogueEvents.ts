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
 *
 * Разбор «спасающий»: модель часто отклоняется от формата (обрыв на лимите вывода,
 * пропущенная строка перевода, лишняя пустая строка, неверное число полей заголовка).
 * Поэтому битый хвостовой блок не роняет весь ход — из каждого блока достаём то, что
 * удалось, недостающий `translation` подставляем как ''. Исключение бросаем только
 * если из непустого ответа не удалось спасти ни одного события (тогда включается
 * повтор — см. GenerateAiDialogueTurn).
 */
export function parseAiDialogueEvents(raw: string): AiDialogueEvent[] {
	const text = raw.trim()
	if (!text) return []

	const lines = text.split('\n').map(stripCarriageReturn)
	const events = splitIntoBlocks(lines)
		.map(parseBlock)
		.filter((event): event is AiDialogueEvent => event !== null)

	if (events.length === 0) throw cannotParse()

	return events
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

// Разбирает один блок. Возвращает null, если блок не удалось спасти (неизвестный
// заголовок, заголовок без содержимого) — такой блок молча отбрасывается.
function parseBlock(block: string[]): AiDialogueEvent | null {
	const header = block[0].trim()
	const type = header.split('|')[0].trim()

	if (type === 'npcActions') {
		return parseNpcActions(block)
	}

	if (type === 'sceneUpdate' || type === 'help' || type === 'worldEvent') {
		return parseTextEvent(type, block)
	}

	return null
}

function parseTextEvent(type: TextEventType, block: string[]): AiDialogueEvent | null {
	// Блок: [заголовок, content, translation?]. translation необязателен — при обрыве
	// хвоста модель могла не дописать его; тогда подставляем ''.
	if (block.length < 2) return null

	const content = block[1]
	const translation = block[2] ?? ''

	if (type === 'sceneUpdate') return { type, content, translation }
	if (type === 'help') return { type, content, translation }
	return { type, content, translation }
}

function parseNpcActions(block: string[]): AiDialogueEvent | null {
	// Поля заголовка: npcActions|npcId|npcName|npcRole|emotion. Недостающие поля
	// (модель могла не дописать emotion или другое поле) подставляем как ''.
	const [, npcId = '', npcName = '', npcRole = '', emotion = ''] = block[0].trim().split('|')

	const actions = parseNpcActionItems(block.slice(1))
	if (actions.length === 0) return null

	return { type: 'npcActions', npcId, npcName, npcRole, emotion, actions }
}

// Разбирает тело npcActions: тройки метка (action:/speech:) / content / translation.
// Толерантен к «мусорным» строкам: не-метку вне пары пропускаем, действие без
// содержимого отбрасываем, недостающий translation последней пары (обрыв хвоста)
// подставляем как ''.
function parseNpcActionItems(body: string[]): AiDialogueNpcActionItem[] {
	const actions: AiDialogueNpcActionItem[] = []

	for (let i = 0; i < body.length; i += 1) {
		const label = body[i].trim()
		if (label !== 'action:' && label !== 'speech:') continue

		const type = label === 'action:' ? 'action' : 'speech'
		const next = i + 1 < body.length ? body[i + 1] : ''
		const afterNext = i + 2 < body.length ? body[i + 2] : ''

		const content = next !== '' && !isLabel(next) ? next : ''
		if (content === '') continue

		const translation = afterNext !== '' && !isLabel(afterNext) ? afterNext : ''

		actions.push({ type, content, translation })
	}

	return actions
}

function isLabel(line: string): boolean {
	const trimmed = line.trim()
	return trimmed === 'action:' || trimmed === 'speech:'
}

function stripCarriageReturn(line: string): string {
	return line.endsWith('\r') ? line.slice(0, -1) : line
}

function cannotParse(): CustomError {
	return new CustomError(errorMessage.aiDialogue.cannotParseLlmResponse, ErrorStatusCode.InternalServerError_500)
}
