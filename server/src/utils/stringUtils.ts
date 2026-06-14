import { randomUUID } from 'crypto'

export function createUniqString() {
	return randomUUID()
}

export function normalizeSentence(text: string): string {
	return text.trim().replace(/\s+/g, ' ').replace(/['']/g, "'").replace(/["«»]/g, '"')
}
