import { Injectable } from '@nestjs/common'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class AiDialogueMessageRepository {
	constructor(private prisma: PrismaService) {}

	/**
	 * Собирает контекст для LLM, проверяющей черновик реплики и/или действия пользователя.
	 * Контекст помогает интерпретировать короткие ответы, обращения и ссылки на события сцены;
	 * сами сохранённые сообщения не являются предметом грамматической проверки.
	 *
	 * Параллельно читает последние 8 событий диалога и последний sceneUpdate. Сцену получает
	 * отдельно, поскольку она может быть старше выбранных событий. recentMessages возвращаются
	 * в хронологическом порядке; scene может также присутствовать среди recentMessages.
	 * textCheckEvent оставляет только ограниченный объём видимого текста и имя NPC, исключая
	 * переводы, словарные карты и визуальные метаданные, чтобы не перегружать промпт.
	 *
	 * Проверку существования и владельца диалога выполняет вызывающий command handler ДО этого
	 * чтения. Summary и языки сюда не входят: handler получает их из записи самого диалога.
	 * Метод только читает БД и не вызывает LLM.
	 *
	 * @param dialogueId ID диалога, доступ к которому уже проверен вызывающим кодом.
	 * @returns Объект { scene, recentMessages }; при отсутствии сцены scene равен null,
	 * а при отсутствии сообщений recentMessages — пустой массив.
	 */
	@CatchDbError()
	async getTextCheckContext(dialogueId: number) {
		const [recent, scene] = await Promise.all([
			this.prisma.aiDialogueMessage.findMany({
				where: { dialogue_id: dialogueId },
				orderBy: { id: 'desc' },
				take: 8,
				select: { type: true, payload: true },
			}),
			this.prisma.aiDialogueMessage.findFirst({
				where: { dialogue_id: dialogueId, type: 'sceneUpdate' },
				orderBy: { id: 'desc' },
				select: { type: true, payload: true },
			}),
		])

		return {
			scene: scene ? textCheckEvent(scene) : null,
			recentMessages: recent.reverse().map(textCheckEvent),
		}
	}

	// Сохраняет одно событие диалога. Дискриминатор `type` ложится в одноимённую
	// колонку, тело события (без `type`) — в payload как JSON-строка. Возвращает
	// строку БД вместе с назначенным сервером id и created_at.
	@CatchDbError()
	async createMessage(dto: { dialogueId: number; event: AiDialogueEvent }) {
		const { type, ...payload } = dto.event
		return this.prisma.aiDialogueMessage.create({
			data: {
				dialogue_id: dto.dialogueId,
				type,
				payload: JSON.stringify(payload),
			},
		})
	}
}

/**
 * Преобразует сохранённое событие диалога в короткий фрагмент контекста проверки
 * пользовательского черновика. Это проекция данных для промпта, а не проверка ошибок
 * и не клиентская модель сообщения.
 *
 * Разбирает JSON из payload, сохраняет дискриминатор type, имя NPC (до 200 символов),
 * content и первые 8 элементов actions с их type/content. Для content и всех actions
 * действует общий бюджет 2000 символов на событие: сначала расходуется на content,
 * затем на действия в исходном порядке. После исчерпания бюджета текст действия пуст.
 * Переводы, wordMap, идентификаторы NPC, эмоции и визуальные данные не передаются.
 *
 * @param message Строка события из БД: type хранится отдельно, payload — JSON-строка.
 * @returns { type, npcName?, content?, actions? }; отсутствующие поля имеют undefined
 * и не попадут в JSON промпта. В actions остаются только { type, content }.
 * @throws SyntaxError Если сохранённый payload не является корректным JSON;
 * вызывающий метод репозитория преобразует ошибку через CatchDbError.
 */
function textCheckEvent(message: { type: string; payload: string }) {
	const event = JSON.parse(message.payload)
	let remaining = 2_000

	function excerpt(value: unknown): string | undefined {
		if (typeof value !== 'string') return undefined
		const text = value.slice(0, remaining)
		remaining -= text.length
		return text
	}

	return {
		type: message.type,
		npcName: typeof event.npcName === 'string' ? event.npcName.slice(0, 200) : undefined,
		content: excerpt(event.content),
		actions: Array.isArray(event.actions)
			? event.actions.slice(0, 8).map((item: { type: string; content: string }) => ({
					type: item.type,
					content: excerpt(item.content) ?? '',
				}))
			: undefined,
	}
}
