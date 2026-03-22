import React from 'react'
import InfoBlock from 'ui/InfoBlock/InfoBlock'
import { useChapterStore } from '_pages/media/chapter/chapterStore'

function YouWillLosePhrasesWarning() {
	const chapter = useChapterStore((s) => s.chapter.data)

	if (!chapter?.content) return null

	return <InfoBlock type='warning'>При обновлении текста главы все переводы будут потеряны.</InfoBlock>
}

export default YouWillLosePhrasesWarning
