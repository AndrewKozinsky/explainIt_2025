import { Injectable, MessageEvent } from '@nestjs/common'
import { Subject } from 'rxjs'

/**
 * In-memory шина SSE-событий: по одному Subject на диалог.
 *
 * Хендлер открытия SSE подписывается на Subject своего диалога, а генерация хода пушит
 * события в этот Subject. Благодаря этому события, созданные POST-запросом
 * (в другом HTTP-запросе), доезжают до уже открытого SSE-соединения.
 *
 * NOTE: субъекты не вычищаются — количество диалогов невелико, а Subject пустой.
 * При необходимости позже можно добавить очистку по отсутствию подписчиков.
 */
@Injectable()
export class AiDialogueSseHub {
	private subjects = new Map<number, Subject<MessageEvent>>()

	/**
	 * Возвращает общий Subject событий диалога в текущем HTTP-процессе, создавая его при первом обращении.
	 * Не проверяет владельца и не воспроизводит историю; это обязанности хендлера открытия SSE-потока.
	 * @param dialogueId Идентификатор AiDialogue.
	 * @returns Subject для подписки на новые события; вызывающий код должен освобождать свою подписку.
	 */
	getDialogueEventSubject(dialogueId: number): Subject<MessageEvent> {
		let subject = this.subjects.get(dialogueId)
		if (!subject) {
			subject = new Subject<MessageEvent>()
			this.subjects.set(dialogueId, subject)
		}
		return subject
	}

	/**
	 * Отправляет событие в уже созданный Subject одного диалога, не сохраняя его для будущих подписчиков.
	 * Если Subject ещё не создан, событие пропускается; история восстанавливается отдельно из БД.
	 * @param dialogueId Диалог, которому предназначено событие.
	 * @param event Обёртка SSE с текстовым событием или техническим сигналом визуального обновления.
	 */
	publishDialogueEvent(dialogueId: number, event: MessageEvent): void {
		this.subjects.get(dialogueId)?.next(event)
	}

	/**
	 * Отправляет visualsChanged всем диалогам с активными локальными подписчиками после восстановления Redis.
	 * Это сигнал перечитать REST-снимок, а не сами изображения; неактивные Subject не уведомляются.
	 */
	notifyActiveDialoguesOfVisualChanges(): void {
		for (const [dialogueId, subject] of this.subjects) {
			if (subject.observed) subject.next({ data: { type: 'visualsChanged', dialogueId } })
		}
	}
}
