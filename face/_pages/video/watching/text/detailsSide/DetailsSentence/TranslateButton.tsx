import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from 'ui/formRelated/buttons/Button/Button'
import { useTranslate_TranslateSentence, useVideoPrivate_Update } from '@/graphql'
import { extractGraphQLError } from '@/graphql/extractGraphQLError'
import {
	populatedPlainTextToResolved,
	populatedSubtitlesToResolved,
} from '_pages/video/watching/common/populatedToResolved'
import { useGetSelectedItem } from '_pages/video/watching/text/detailsSide/DetailsSentence/fn/getSelectedItem'
import { useWatchingStore } from '_pages/video/watching/watchingStore'

function TranslateButton() {
	const { selectedItem } = useGetSelectedItem()
	const video = useWatchingStore((s) => s.video)

	const [translateSentence, { loading }] = useTranslate_TranslateSentence()
	const [updateVideo] = useVideoPrivate_Update()
	const [errorText, setErrorText] = React.useState<null | string>(null)

	const hasTranslation = Boolean(selectedItem?.translation)

	async function onTranslateClick() {
		setErrorText(null)

		try {
			const { data } = await translateSentence({
				variables: {
					input: {
						text: selectedItem!.sentenceText,
					},
				},
			})

			const translatedText = data?.translate_translate_sentence.translatedText
			if (!translatedText) return
			if (!video?.data?.id) return

			const sentenceId = selectedItem!.sentenceId
			const watchingStore = useWatchingStore.getState()

			if (watchingStore.selectedText.subtitle) {
				watchingStore.updateSubtitlesSentenceTranslation(sentenceId, translatedText)
			} else {
				watchingStore.updatePlainTextSentenceTranslation(sentenceId, translatedText)
			}

			const updatedWatchingStore = useWatchingStore.getState()
			const textResolved = updatedWatchingStore.selectedText.subtitle
				? JSON.stringify(populatedSubtitlesToResolved(updatedWatchingStore.populatedSubtitles))
				: JSON.stringify(populatedPlainTextToResolved(updatedWatchingStore.populatedPlainText))

			await updateVideo({
				variables: {
					input: {
						id: video.data.id,
						textResolved,
					},
				},
			})
		} catch (error: unknown) {
			const gqError = extractGraphQLError(error)
			setErrorText(gqError?.message ?? 'Ошибка при переводе')
		}
	}

	if (!selectedItem) return null
	if (hasTranslation) return null

	return (
		<>
			<Button onClick={onTranslateClick} loading={loading}>
				Перевести
			</Button>
			<ErrorMessage text={errorText} />
		</>
	)
}

export default TranslateButton
