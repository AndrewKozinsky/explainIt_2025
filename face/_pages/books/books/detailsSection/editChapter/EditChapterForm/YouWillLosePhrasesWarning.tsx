import React from 'react'
import InfoBlock from 'ui/InfoBlock/InfoBlock'
import { useBooksStore } from '_pages/books/books/booksStore'

function YouWillLosePhrasesWarning() {
	const chapter = useBooksStore((s) => s.chapter.data)

	if (!chapter?.content) return null

	return <InfoBlock type='warning'>При обновлении текста главы все переведённые фразы будут потеряны.</InfoBlock>
}

export default YouWillLosePhrasesWarning
