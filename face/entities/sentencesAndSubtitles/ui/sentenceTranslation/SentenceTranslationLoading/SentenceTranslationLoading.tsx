type SentenceTranslationLoadingProps = {
	loading: boolean
}

function SentenceTranslationLoading(props: SentenceTranslationLoadingProps) {
	if (!props.loading) {
		return null
	}

	return <span />
}

export default SentenceTranslationLoading
