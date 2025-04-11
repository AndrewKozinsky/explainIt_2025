export class EventEmitter {
	subscribers: Record<string, Function[]> = {}

	on(eventName: string, listener: (...args: any[]) => any): any {
		if (!this.subscribers[eventName]) {
			this.subscribers[eventName] = []
		}

		this.subscribers[eventName].push(listener)

		return () => {
			this.subscribers[eventName] = this.subscribers[eventName].filter((fn) => {
				return fn !== listener
			})
		}
	}

	emit(eventName: string): any {
		if (!this.subscribers[eventName]) return

		this.subscribers[eventName].forEach((cb) => cb())
	}
}
