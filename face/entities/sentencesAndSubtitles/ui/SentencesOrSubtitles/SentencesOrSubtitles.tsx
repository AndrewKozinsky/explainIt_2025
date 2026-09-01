import { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import { VideoContentType, VideoSubtitlesModel } from '@/entities/video/repository/VideosRepository'
import { LanguageCode } from '@/shared/utils/languages'
import Sentences from '../Sentences/Sentences'
import Subtitles from '../Subtitles/Subtitles'
import type { CurrentTimeSource } from '../Subtitles/fn/useSubtitlesPlaybackDomSync'
import './SentencesOrSubtitles.scss'

type TextSideProps = {
	languageCode: LanguageCode
	contentType: VideoContentType
	timeSource: CurrentTimeSource
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	plainSentences: null | SentenceModel[]
	subtitles: null | VideoSubtitlesModel.Structure
}

function SentencesOrSubtitles(props: TextSideProps) {
	const {
		languageCode,
		contentType,
		timeSource,
		selectedSentenceId,
		selectedWordId,
		selectWord,
		plainSentences,
		subtitles,
	} = props

	return (
		<div className='watching-text-side'>
			<div className='watching-text-side__content'>
				{contentType === 'text' && plainSentences && (
					<Sentences
						sentences={plainSentences}
						selectedSentenceId={selectedSentenceId}
						selectedWordId={selectedWordId}
						selectWord={selectWord}
						languageCode={languageCode}
					/>
				)}
				{contentType === 'subtitles' && subtitles?.subtitles && (
					<Subtitles
						subtitles={subtitles.subtitles}
						timeSource={timeSource}
						selectedSentenceId={selectedSentenceId}
						selectedWordId={selectedWordId}
						selectWord={selectWord}
						languageCode={languageCode}
					/>
				)}
			</div>
		</div>
	)
}

export default SentencesOrSubtitles
