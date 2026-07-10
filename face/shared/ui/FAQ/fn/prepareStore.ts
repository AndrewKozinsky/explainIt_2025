import { useState } from 'react'
import { FaqStoreType } from './faqStoreTypes'
import FaqTypes from './faqTypes'

export function usePrepareStore(config: FaqTypes.Config) {
	const [store, setStore] = useState<FaqStoreType.State>({ items: prepareStoreData(config) })

	return {
		store,
		setStore,
	}
}

function prepareStoreData(config: FaqTypes.Config): FaqStoreType.Item[] {
	return config.map((itemConfig, i) => {
		return { itemId: i, ...itemConfig, isAnswerOpen: false }
	})
}
