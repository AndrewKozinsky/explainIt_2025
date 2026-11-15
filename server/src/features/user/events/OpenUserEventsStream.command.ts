import { MessageEvent } from '@nestjs/common'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { UserRepository } from 'repo/user.repository'
import { UserStreamEvent } from 'types/userStreamEvent'
import { UserEventsSseHub } from './UserEventsSseHub.service'

export class OpenUserEventsStreamCommand implements ICommand {
	constructor(public userId: number) {}
}

/**
 * Открывает личный SSE-поток пользователя: сначала текущий баланс, затем события из шины.
 * Поток холодный: подписка на шину и чтение баланса происходят только при подключении клиента.
 */
@CommandHandler(OpenUserEventsStreamCommand)
export class OpenUserEventsStreamHandler implements ICommandHandler<
	OpenUserEventsStreamCommand,
	Observable<MessageEvent>
> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hub: UserEventsSseHub,
	) {}

	async execute(command: OpenUserEventsStreamCommand): Promise<Observable<MessageEvent>> {
		return new Observable<MessageEvent>((subscriber) => {
			let hasReceivedBalanceEvent = false

			function send(event: UserStreamEvent) {
				if (!subscriber.closed) subscriber.next({ data: event })
			}

			// Подписка до чтения баланса: изменение во время чтения не потеряется.
			const hubSubscription = this.hub.subscribe(command.userId, (event) => {
				if (event.type === 'balance') hasReceivedBalanceEvent = true
				send(event)
			})

			void this.userRepository
				.getBalance(command.userId)
				.then((balance) => {
					// Событие шины, пришедшее во время чтения, новее прочитанного значения.
					if (balance !== null && !hasReceivedBalanceEvent) send({ type: 'balance', balance })
				})
				.catch((error) => {
					if (!subscriber.closed) subscriber.error(error)
				})

			return () => hubSubscription.unsubscribe()
		})
	}
}
