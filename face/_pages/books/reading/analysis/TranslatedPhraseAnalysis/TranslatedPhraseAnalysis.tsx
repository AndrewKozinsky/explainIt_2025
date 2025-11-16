import { useIsLongTopText } from '_pages/books/reading/analysis/TranslatedPhraseAnalysis/fn/isLargeTopText'
import cn from 'classnames'
import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetSelectedPhrase } from '_pages/books/reading/lib/getSelectedPhraseType'
import './TranslatedPhraseAnalysis.scss'

function TranslatedPhraseAnalysis() {
	const selectedPhrase = useGetSelectedPhrase<ChapterTextStructurePopulated.SuccessPhrase>()
	const isLongTopText = useIsLongTopText(selectedPhrase)

	return (
		<div className='translated-phrase-analysis'>
			<p
				className={cn(
					'translated-phrase-analysis__top-block',
					isLongTopText && 'translated-phrase-analysis__top-block--long',
				)}
			>
				<span>{selectedPhrase.analysis.translation}</span>
				<span className='translated-phrase-analysis__phrase-arrow'>
					<span>→</span>
				</span>
				<span>{selectedPhrase.phrase}</span>
				<span className='translated-phrase-analysis__phrase-transcription'>
					{selectedPhrase.analysis.transcription}
				</span>
			</p>
			<div className='translated-phrase-analysis__content'>
				<div className='translated-phrase-analysis__content-analysis'>{selectedPhrase.analysis.analysis}</div>
				<div className='translated-phrase-analysis__content-examples'>
					{selectedPhrase.analysis.examples.map((example, index) => {
						return (
							<p className='translated-phrase-analysis__content-example' key={index}>
								{example.foreignLang} —{' '}
								<span className='translated-phrase-analysis__content-example-native'>
									{example.nativeLang}
								</span>
							</p>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default TranslatedPhraseAnalysis
