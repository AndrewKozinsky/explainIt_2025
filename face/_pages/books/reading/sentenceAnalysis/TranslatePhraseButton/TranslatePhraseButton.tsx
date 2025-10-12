import Button from 'ui/formRelated/buttons/Button/Button'
import { useGetTranslatePhraseAndSentence } from './fn/onButtonClick'
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
