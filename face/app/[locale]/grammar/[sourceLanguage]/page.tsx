import LanguagePage from '_pages/grammar/languagePage/LanguagePage/LanguagePage'

type GrammarLanguagePageProps = {
	params: Promise<{
		sourceLanguage: string
	}>
}

export default async function GrammarLanguageRoute(props: GrammarLanguagePageProps) {
	const { sourceLanguage } = await props.params

	return <LanguagePage sourceLanguage={sourceLanguage} />
}
