import { useCallback, useState } from 'react'
import ArticleType from '../../../articlesData/articleType'
import transcriptionService from '../../../transcriptionService/transcriptionService'

export function getEngTranscription(engSentenceParts: ArticleType.Text[]) {
	const collectedSentence = engSentenceParts.reduce((acc, text) => {
		return (acc += text.text)
	}, '')

	return transcriptionService.getTranscriptionBySentence(collectedSentence)
}

export function getRootClasses(config: ArticleType.RusToEng) {
	return [
		'art-rus-to-eng',
		config.textSize && 'art-rus-to-eng--size-' + config.textSize,
		config.offset && 'art-rus-to-eng--offset',
	]
}

export function useGetToggleTranscription() {
	const [isTranscriptionOpen, setIsTranscriptionOpen] = useState(false)

	const toggleTranscription = useCallback(function () {
		setIsTranscriptionOpen((isOpen) => !isOpen)
	}, [])

	return {
		isTranscriptionOpen,
		toggleTranscription,
	}
}
