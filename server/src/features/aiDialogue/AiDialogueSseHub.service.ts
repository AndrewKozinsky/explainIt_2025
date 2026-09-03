import { Injectable, MessageEvent } from '@nestjs/common'
import { Subject } from 'rxjs'

/**
 * In-memory шина SSE-событий: по одному Subject на диалог.
 *
 * @Sse-эндпоинт подписывается на Subject своего диалога, а генерация хода пушит
 * события в этот Subject. Благодаря этому события, созданные POST-запросом
 * (в другом HTTP-запросе), доезжают до уже открытого SSE-соединения.
 *
 * NOTE: субъекты не вычищаются — количество диалогов невелико, а Subject пустой.
 * При необходимости позже можно добавить очистку по отсутствию подписчиков.
 */
@Injectable()
export class AiDialogueSseHub {
	private subjects = new Map<number, Subject<MessageEvent>>()

	getSubject(dialogueId: number): Subject<MessageEvent> {
		let subject = this.subjects.get(dialogueId)
		if (!subject) {
			subject = new Subject<MessageEvent>()
			this.subjects.set(dialogueId, subject)
		}
		return subject
	}

	emit(dialogueId: number, event: MessageEvent) {
		this.subjects.get(dialogueId)?.next(event)
	}
}
