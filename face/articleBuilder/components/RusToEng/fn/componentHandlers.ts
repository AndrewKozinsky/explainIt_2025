import { RefObject, useCallback, useEffect, useState } from 'react'
import ArticleType from '../../../articlesData/articleType'
import transcriptionService from '../../../transcriptionService/transcriptionService'

export function getEngTranscription(engSentenceParts: ArticleType.Text[]) {
	const collectedSentence = engSentenceParts.reduce((acc, text) => {
		return acc + text.text
	}, '')

	return transcriptionService.getTranscriptionBySentence(collectedSentence)
}

export function getRootClasses(config: ArticleType.RusToEng) {
	return [
		'art-rus-to-eng__text',
		config.textSize && 'art-rus-to-eng__text--size-' + config.textSize,
		config.offset && 'art-rus-to-eng__text--offset',
	]
}

export function useGetToggleTranscription(transcriptionBlockRef: RefObject<HTMLDivElement | null>) {
	const [isTranscriptionOpen, setIsTranscriptionOpen] = useState(false)

	useEffect(
		function () {
			const $transcriptionBlock = transcriptionBlockRef.current
			if (!$transcriptionBlock) return

			const duration = 200

			if (isTranscriptionOpen) {
				$transcriptionBlock.style.display = 'block'

				setTimeout(() => {
					$transcriptionBlock.classList.add('art-rus-to-eng__transcription--open')

					// @ts-ignore
					const blockHeight = $transcriptionBlock.children[0].offsetHeight
					$transcriptionBlock.style.height = blockHeight + 6 + 'px'
					$transcriptionBlock.style.marginBottom = '1rem'
				}, 0)
			} else {
				$transcriptionBlock.classList.remove('art-rus-to-eng__transcription--open')
				$transcriptionBlock.style.height = '0'
				$transcriptionBlock.style.marginBottom = '0'

				setTimeout(() => {
					$transcriptionBlock.style.display = 'none'
				}, duration)
			}
		},
		[isTranscriptionOpen],
	)

	return useCallback(function () {
		setIsTranscriptionOpen((isOpen) => !isOpen)
	}, [])
}
