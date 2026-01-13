import { useGetSelectedItem } from '_pages/video/watching/text/detailsSide/DetailsSentence/fn/getSelectedItem'
import React from 'react'
import { useTranslate_TranslateSentence } from '@/graphql'
import { extractGraphQLError } from '@/graphql/extractGraphQLError'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from 'ui/formRelated/buttons/Button/Button'

function TranslateButton() {
	const { selectedItem } = useGetSelectedItem()

	const [translateSentence, { loading }] = useTranslate_TranslateSentence()
	const [errorText, setErrorText] = React.useState<null | string>(null)
	const [isButtonVisible, setIsButtonVisible] = React.useState(true)

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

			setIsButtonVisible(false)

			console.log(translatedText)
		} catch (error: unknown) {
			const gqError = extractGraphQLError(error)
			setErrorText(gqError?.message ?? 'Ошибка при переводе')
		}
	}

	if (!isButtonVisible) return null

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
