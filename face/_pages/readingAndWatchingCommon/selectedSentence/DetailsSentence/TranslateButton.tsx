import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from 'ui/formRelated/buttons/Button/Button'
import { useTranslateSentence } from '_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/fn/translateSentence'
import {
	SentenceTranslationProvider,
	useSelectedSentenceStore,
} from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'

function TranslateButton() {
	const { onTranslateClick, loading, errorText } = useTranslateSentence()

	const setTranslationProvider = useSelectedSentenceStore((s) => s.setTranslationProvider)
	const translationProvider = useSelectedSentenceStore((s) => s.translationProvider)
	const sentenceTranslations = useSelectedSentenceStore((s) => s.sentenceTranslations)
	const sentenceTranslationsLoading = useSelectedSentenceStore((s) => s.sentenceTranslationsLoading)

	function onProviderSelect(provider: SentenceTranslationProvider) {
		setTranslationProvider(provider)
	}

	const hasTranslationForProvider = sentenceTranslations.some((t) => t.provider === translationProvider)

	return (
		<>
			<Button onClick={() => onProviderSelect('yandexTranslate')}>Переводчик Яндекса</Button>
			<Button onClick={() => onProviderSelect('chatGPTNano')}>ChatGPT Nano</Button>
			<Button onClick={() => onProviderSelect('chatGPTMini')}>ChatGPT Mini</Button>
			<Button onClick={() => onProviderSelect('chatGPTStandard')}>ChatGPT</Button>

			{sentenceTranslationsLoading || hasTranslationForProvider ? null : (
				<Button onClick={onTranslateClick} loading={loading}>
					Перевести
				</Button>
			)}
			<ErrorMessage text={errorText ?? ''} />
		</>
	)
}

export default TranslateButton
