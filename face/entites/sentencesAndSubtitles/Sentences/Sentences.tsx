'use client'

import { SentenceModel } from '@/entites/media/repository/SentenceTypes'
import SentenceBlock from '@/entites/sentencesAndSubtitles/SentenceBlock/SentenceBlock'
import { LanguageCode } from '@/shared/utils/languages'
import './Sentences.scss'

type ChapterContentProps = {
	languageCode: LanguageCode
	sentences: SentenceModel[]
	selectedSentenceId?: null | number
	selectedWordId?: null | number
	selectWord?: (input: { sentenceId: number; wordId: number }) => void
}

function Sentences(props: ChapterContentProps) {
	const { languageCode, sentences, selectedSentenceId = null, selectedWordId = null, selectWord = () => {} } = props

	return (
		<div className='sentences'>
			{sentences.map((sentence) => {
				return (
					<SentenceBlock
						key={sentence.id}
						sentence={sentence}
						selectedSentenceId={selectedSentenceId}
						selectedWordId={selectedWordId}
						selectWord={selectWord}
						languageCode={languageCode}
						environmentColor='white'
					/>
				)
			})}
		</div>
	)
}

export default Sentences
