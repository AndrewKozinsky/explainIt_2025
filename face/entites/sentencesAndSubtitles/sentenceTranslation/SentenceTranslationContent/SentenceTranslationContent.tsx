type SentenceTranslationContentProps = {
	translationText: string
}

function SentenceTranslationContent(props: SentenceTranslationContentProps) {
	if (!props.translationText) {
		return null
	}

	return <>{props.translationText}</>
}

export default SentenceTranslationContent
