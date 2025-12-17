import { useGetParsedAnalysis } from '_pages/books/reading/analysis/TranslatedPhraseAnalysis/fn/parceAnalysis'
import { useIsLongTopText } from './fn/isLargeTopText'
import cn from 'classnames'
import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetSelectedPhrase } from '_pages/books/reading/lib/getSelectedPhraseType'
import './TranslatedPhraseAnalysis.scss'

function TranslatedPhraseAnalysis() {
	const selectedPhrase = useGetSelectedPhrase<ChapterTextStructurePopulated.SuccessPhrase>()
	const isLongTopText = useIsLongTopText(selectedPhrase)

	const analysis = useGetParsedAnalysis()

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
				<div className='translated-phrase-analysis__content-analysis'>
					{Object.values(analysis).map((item) => (
						<ContentAndHeader header={item.header} key={item.header}>
							<p className='translated-phrase-analysis__content-analysis-item-text'>{item.value}</p>
						</ContentAndHeader>
					))}
				</div>
				<div className='translated-phrase-analysis__content-examples'>
					<ContentAndHeader header='Примеры'>
						<div className='translated-phrase-analysis__content-examples-items'>
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
					</ContentAndHeader>
				</div>
			</div>
		</div>
	)
}

export default TranslatedPhraseAnalysis

type ContentAndHeaderProps = {
	header: string
	children: React.ReactNode
}

function ContentAndHeader(props: ContentAndHeaderProps) {
	const { header, children } = props

	return (
		<div className='translated-phrase-analysis__content-and-header'>
			<h3 className='translated-phrase-analysis__content-and-header-header'>{header}</h3>
			{children}
		</div>
	)
}
