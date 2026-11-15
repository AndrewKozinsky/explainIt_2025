import { Injectable } from '@nestjs/common'
import { Subject, Subscription } from 'rxjs'
import { UserStreamEvent } from 'types/userStreamEvent'

/**
 * In-memory шина событий личных SSE-потоков пользователей в текущем HTTP-процессе.
 * У пользователя может быть несколько потоков (вкладки, устройства): все подписаны на один Subject.
 * Subject удаляется, когда отписывается последний поток.
 */
@Injectable()
export class UserEventsSseHub {
	private subjects = new Map<number, Subject<UserStreamEvent>>()

	/**
	 * Подписывает поток пользователя на его события.
	 * @returns Подписка; её отмена удаляет Subject, если других потоков пользователя нет.
	 */
	subscribe(userId: number, onEvent: (event: UserStreamEvent) => void): Subscription {
		let subject = this.subjects.get(userId)
		if (!subject) {
			subject = new Subject<UserStreamEvent>()
			this.subjects.set(userId, subject)
		}

		const subscription = subject.subscribe(onEvent)
		const userSubject = subject

		subscription.add(() => {
			if (!userSubject.observed && this.subjects.get(userId) === userSubject) this.subjects.delete(userId)
		})

		return subscription
	}

	/** Отправляет событие всем открытым потокам пользователя; без потоков событие пропускается. */
	publish(userId: number, event: UserStreamEvent): void {
		this.subjects.get(userId)?.next(event)
	}

	/** Пользователи, у которых в этом процессе открыт хотя бы один поток. */
	getConnectedUserIds(): number[] {
		return [...this.subjects.keys()]
	}
}
