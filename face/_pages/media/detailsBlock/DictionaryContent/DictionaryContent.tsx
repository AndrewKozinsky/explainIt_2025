import React from 'react'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import PhraseDictionary from '../../dictionary/PhraseDictionary/PhraseDictionary'

function DictionaryContent() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)

	if (currentInfoView !== 'dictionary') {
		return null
	}

	return <PhraseDictionary />
}

export default DictionaryContent
