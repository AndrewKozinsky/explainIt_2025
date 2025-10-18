import Button from 'ui/formRelated/buttons/Button/Button'
import { useGetTranslatePhraseAndSentence } from '_pages/books/reading/sentenceAnalysis/TranslatePhraseButton/fn/getTranslatePhraseAndSentence'
import { useGetButtonText } from './fn/getButtonText'

type TranslatePhraseButtonProps = {
	sentenceId: number
	phraseWordIds: number[]
}

export function TranslatePhraseButton(props: TranslatePhraseButtonProps) {
	const { sentenceId, phraseWordIds } = props

	const buttonText = useGetButtonText(phraseWordIds)
	const onButtonClick = useGetTranslatePhraseAndSentence(sentenceId, phraseWordIds)

	return <Button onClick={onButtonClick}>{buttonText}</Button>
}
