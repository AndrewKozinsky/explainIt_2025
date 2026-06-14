import React from 'react'
import StyledMarkdown from 'ui/StyledMarkdown/StyledMarkdown'
import PhraseTranslationExamples from '_pages/media/dictionary/PhraseTranslationExamples/PhraseTranslationExamples'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'
import './PhraseTranslationResult.scss'

function PhraseTranslationResult() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const translation = usePhraseDictionaryStore((s) => s.translation)

	if (status !== 'ready' || !translation) return null

	return (
		<div className='phrase-translation-result'>
			<section className='phrase-translation-result__core-idea'>
				<StyledMarkdown content={translation.coreIdea} />
			</section>

			{translation.usageGroups.length > 0 && (
				<section className='phrase-translation-result__usage-groups'>
					<h3 className='phrase-translation-result__section-title'>Сценарии употребления</h3>
					<div className='phrase-translation-result__usage-groups-content'>
						{translation.usageGroups.map((group, idx) => (
							<div key={idx} className='phrase-translation-result__usage-group'>
								<h4 className='phrase-translation-result__group-title'>
									<span className='phrase-translation-result__group-title__number'>{idx + 1}</span>
									{group.title}
								</h4>
								<p className='phrase-translation-result__group-explain'>{group.explain}</p>
								<PhraseTranslationExamples
									config={group.examples.map((e) => ({
										sentence: e.sentence,
										translate: e.translate,
									}))}
								/>
							</div>
						))}
					</div>
				</section>
			)}

			{translation.similarWords && (
				<section className='phrase-translation-result__similar-words'>
					<h3 className='phrase-translation-result__section-title'>Похожие слова</h3>
					<StyledMarkdown content={translation.similarWords} />
				</section>
			)}

			{translation.commonMistakes && (
				<section className='phrase-translation-result__common-mistakes'>
					<h3 className='phrase-translation-result__section-title'>Типичные ошибки</h3>
					<StyledMarkdown content={translation.commonMistakes} />
				</section>
			)}

			{translation.patterns && translation.patterns.length > 0 && (
				<section className='phrase-translation-result__patterns'>
					<h3 className='phrase-translation-result__section-title'>Типовые конструкции</h3>
					<PhraseTranslationExamples
						config={translation.patterns.map((p) => ({
							sentence: p.phrase,
							translate: p.translate,
						}))}
					/>
				</section>
			)}
		</div>
	)
}

export default PhraseTranslationResult
