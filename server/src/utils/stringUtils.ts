import { randomUUID } from 'crypto'

export function createUniqString() {
	return randomUUID()
}
