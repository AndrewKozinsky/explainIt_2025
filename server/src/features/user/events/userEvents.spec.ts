jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/user.repository', () => ({ UserRepository: class {} }))
jest.mock('infrastructure/redis/userBalanceNotifications.service', () => ({ UserBalanceNotifications: class {} }))

import { MessageEvent } from '@nestjs/common'
import { firstValueFrom, Observable, take, toArray } from 'rxjs'
import { UserRepository } from 'repo/user.repository'
import { UserStreamEvent } from 'types/userStreamEvent'
import { UserBalanceNotifications } from 'infrastructure/redis/userBalanceNotifications.service'
import { OpenUserEventsStreamCommand, OpenUserEventsStreamHandler } from './OpenUserEventsStream.command'
import { UserBalanceEvents } from './UserBalanceEvents.service'
import { UserEventsSseHub } from './UserEventsSseHub.service'

function getStreamEventData(event: MessageEvent): UserStreamEvent {
	return event.data as UserStreamEvent
}

describe('UserEventsSseHub', () => {
	it('отправляет событие всем потокам пользователя и не трогает других пользователей', () => {
		const hub = new UserEventsSseHub()
		const firstTabEvents: UserStreamEvent[] = []
		const secondTabEvents: UserStreamEvent[] = []
		const otherUserEvents: UserStreamEvent[] = []

		hub.subscribe(1, (event) => firstTabEvents.push(event))
		hub.subscribe(1, (event) => secondTabEvents.push(event))
		hub.subscribe(2, (event) => otherUserEvents.push(event))
		hub.publish(1, { type: 'balance', balance: 300 })

		expect(firstTabEvents).toEqual([{ type: 'balance', balance: 300 }])
		expect(secondTabEvents).toEqual([{ type: 'balance', balance: 300 }])
		expect(otherUserEvents).toEqual([])
	})

	it('забывает пользователя, когда закрывается его последний поток', () => {
		const hub = new UserEventsSseHub()
		const firstTab = hub.subscribe(1, () => undefined)
		const secondTab = hub.subscribe(1, () => undefined)

		firstTab.unsubscribe()
		expect(hub.getConnectedUserIds()).toEqual([1])

		secondTab.unsubscribe()
		expect(hub.getConnectedUserIds()).toEqual([])
	})
})

describe('UserBalanceEvents', () => {
	function createBalanceEvents(getBalancesOfUsers: jest.Mock) {
		const hub = new UserEventsSseHub()
		const userRepository = { getBalancesOfUsers } as unknown as UserRepository
		const balanceEvents = new UserBalanceEvents({} as UserBalanceNotifications, userRepository, hub)

		return { hub, balanceEvents }
	}

	it('пересылает новый баланс после списания без чтения из БД', () => {
		const getBalancesOfUsers = jest.fn()
		const { hub, balanceEvents } = createBalanceEvents(getBalancesOfUsers)
		const receivedEvents: UserStreamEvent[] = []
		hub.subscribe(5, (event) => receivedEvents.push(event))

		balanceEvents.handleNotification({ type: 'userBalanceChanged', userId: 5, balance: -40 })

		expect(receivedEvents).toEqual([{ type: 'balance', balance: -40 }])
		expect(getBalancesOfUsers).not.toHaveBeenCalled()
	})

	it('после начисления перечитывает балансы только подключённых пользователей', async () => {
		const getBalancesOfUsers = jest.fn().mockResolvedValue([
			{ userId: 5, balance: 100_000 },
			{ userId: 6, balance: 60_000 },
		])
		const { hub, balanceEvents } = createBalanceEvents(getBalancesOfUsers)
		const firstUserEvents: UserStreamEvent[] = []
		const secondUserEvents: UserStreamEvent[] = []
		hub.subscribe(5, (event) => firstUserEvents.push(event))
		hub.subscribe(6, (event) => secondUserEvents.push(event))

		await balanceEvents.sendBalancesOfConnectedUsers()

		expect(getBalancesOfUsers).toHaveBeenCalledWith([5, 6])
		expect(firstUserEvents).toEqual([{ type: 'balance', balance: 100_000 }])
		expect(secondUserEvents).toEqual([{ type: 'balance', balance: 60_000 }])
	})

	it('не обращается к БД, если подключённых пользователей нет', async () => {
		const getBalancesOfUsers = jest.fn()
		const { balanceEvents } = createBalanceEvents(getBalancesOfUsers)

		await balanceEvents.sendBalancesOfConnectedUsers()

		expect(getBalancesOfUsers).not.toHaveBeenCalled()
	})

	it('не падает при ошибке БД', async () => {
		const { hub, balanceEvents } = createBalanceEvents(jest.fn().mockRejectedValue(new Error('db is down')))
		hub.subscribe(5, () => undefined)

		await expect(balanceEvents.sendBalancesOfConnectedUsers()).resolves.toBeUndefined()
	})
})

describe('OpenUserEventsStreamHandler', () => {
	async function openStream(getBalance: jest.Mock, hub: UserEventsSseHub): Promise<Observable<MessageEvent>> {
		const userRepository = { getBalance } as unknown as UserRepository
		const handler = new OpenUserEventsStreamHandler(userRepository, hub)

		return handler.execute(new OpenUserEventsStreamCommand(5))
	}

	it('сначала отдаёт текущий баланс, затем изменения', async () => {
		const hub = new UserEventsSseHub()
		const stream = await openStream(jest.fn().mockResolvedValue(100_000), hub)
		const receivedEventsPromise = firstValueFrom(stream.pipe(take(2), toArray()))

		await Promise.resolve()
		hub.publish(5, { type: 'balance', balance: 99_000 })
		const receivedEvents = await receivedEventsPromise

		expect(receivedEvents.map(getStreamEventData)).toEqual([
			{ type: 'balance', balance: 100_000 },
			{ type: 'balance', balance: 99_000 },
		])
	})

	it('не отдаёт прочитанный баланс, если во время чтения пришло более новое значение', async () => {
		const hub = new UserEventsSseHub()
		let resolveBalance: (balance: number) => void = () => undefined
		const getBalance = jest.fn(() => new Promise<number>((resolve) => (resolveBalance = resolve)))
		const stream = await openStream(getBalance, hub)
		const receivedEvents: UserStreamEvent[] = []
		const subscription = stream.subscribe((event) => receivedEvents.push(getStreamEventData(event)))

		hub.publish(5, { type: 'balance', balance: 90_000 })
		resolveBalance(100_000)
		await Promise.resolve()
		await Promise.resolve()

		expect(receivedEvents).toEqual([{ type: 'balance', balance: 90_000 }])
		subscription.unsubscribe()
	})

	it('отключение клиента снимает подписку на шину', async () => {
		const hub = new UserEventsSseHub()
		const stream = await openStream(jest.fn().mockResolvedValue(100_000), hub)

		const subscription = stream.subscribe(() => undefined)
		expect(hub.getConnectedUserIds()).toEqual([5])

		subscription.unsubscribe()
		expect(hub.getConnectedUserIds()).toEqual([])
	})
})
