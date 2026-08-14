import { useEffect, useState } from 'react'
import Sentence from '@/entities/sentencesAndSubtitles/Sentence/Sentence'
import type { VideoSubtitlesModel } from '@/entities/video/repository/VideosRepository'
import { LanguageCode } from '@/shared/utils/languages'
import SentenceAndPhraseTranslationBlock from '../SentenceTranslationBlock/SentenceAndPhraseTranslationBlock'
import './SubtitleBlock.scss'

type SubtitleBlockProps = {
	subtitle: VideoSubtitlesModel.Subtitle
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: LanguageCode
}

function SubtitleBlock(props: SubtitleBlockProps) {
	const { subtitle, selectedSentenceId, selectedWordId, selectWord, languageCode } = props

	// Последнее предложение, которое было выделено в рамках этого субтитра.
	const [lastSelectedSentenceId, setLastSelectedSentenceId] = useState<null | number>(null)

	useEffect(() => {
		const found = subtitle.texts.find((s) => s.sentenceId === selectedSentenceId)
		if (found) {
			setLastSelectedSentenceId(found.sentenceId)
		}
	}, [selectedSentenceId])

	const lastSelectedSentence =
		lastSelectedSentenceId !== null ? subtitle.texts.find((s) => s.sentenceId === lastSelectedSentenceId) : null

	return (
		<div className='subtitle-block' data-subtitle-id={subtitle.id} id={`subtitle-${subtitle.id}`}>
			<div className='subtitle-block__subtitle'>
				{subtitle.texts.map((sentence) => {
					return (
						<Sentence
							sentenceId={sentence.sentenceId}
							sentenceText={sentence.text}
							selectedSentenceId={selectedSentenceId}
							selectedWordId={selectedWordId}
							key={`${subtitle.id}-${sentence.sentenceId}-${sentence.wordOffset}`}
							selectWord={selectWord}
							wordIdOffset={sentence.wordOffset}
						/>
					)
				})}
			</div>
			{lastSelectedSentence && (
				<SentenceAndPhraseTranslationBlock
					sentenceId={lastSelectedSentence.sentenceId}
					languageCode={languageCode}
					bgColor='gray'
				/>
			)}
		</div>
	)
}

export default SubtitleBlock
