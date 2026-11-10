import { createContext } from 'react'
import type {
	SenseBlockModel,
	TranslationBlockModel,
} from '@/entities/universalPhrase/repository/PhraseTranslationRepository'

/** Номера значений статьи. Пусто, если значение одно: тогда номер ничего не сообщает. */
export const SenseNumbersContext = createContext<Map<SenseBlockModel, number>>(new Map())

function collectSenses(blocks: TranslationBlockModel[]): SenseBlockModel[] {
	return blocks.flatMap((block) => {
		if (block.type === 'sense') return [block, ...collectSenses(block.children)]
		return block.type === 'block' ? collectSenses(block.children) : []
	})
}

export function numberSenses(blocks: TranslationBlockModel[]): Map<SenseBlockModel, number> {
	const senses = collectSenses(blocks)

	return new Map(senses.length > 1 ? senses.map((sense, senseIndex) => [sense, senseIndex + 1]) : [])
}
