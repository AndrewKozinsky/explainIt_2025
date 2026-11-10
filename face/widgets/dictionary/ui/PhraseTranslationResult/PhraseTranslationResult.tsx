import { usePhraseDictionaryStore } from '../phraseDictionaryStore'
import ArticleBlockTree from './ArticleBlockTree/ArticleBlockTree'
import { numberSenses, SenseNumbersContext } from './senseNumbers'
import WordFormsCard from './WordFormsCard/WordFormsCard'
import './PhraseTranslationResult.scss'

/** Словарная статья: значения, формы слова и дополнительные разделы. */
function PhraseTranslationResult() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const translation = usePhraseDictionaryStore((s) => s.translation)
	const inputText = usePhraseDictionaryStore((s) => s.inputText)

	if (status !== 'ready' || !translation || translation.blocks.length === 0) return null

	return (
		<div className='phrase-translation-result'>
			<SenseNumbersContext.Provider value={numberSenses(translation.blocks)}>
				<ArticleBlockTree blocks={translation.blocks} />
			</SenseNumbersContext.Provider>
			{translation.wordForms.map((wordForms) => (
				<WordFormsCard key={wordForms.forms.join(' ')} wordForms={wordForms} lookedUpText={inputText} />
			))}
			<ArticleBlockTree blocks={translation.deepSections} />
		</div>
	)
}

export default PhraseTranslationResult
