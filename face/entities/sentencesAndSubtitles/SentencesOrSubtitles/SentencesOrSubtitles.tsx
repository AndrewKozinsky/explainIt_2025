import { SentenceModel } from '@/entities/media/repository/SentenceTypes'
// import Sentences from '@/entities/sentencesAndSubtitles/Sentences/Sentences'
import { VideoContentType, VideoSubtitlesModel } from '@/entities/video/repository/VideosRepository'
import { LanguageCode } from '@/shared/utils/languages'
// import Subtitles from '../Subtitles/Subtitles'
import './SentencesOrSubtitles.scss'

type TextSideProps = {
	languageCode: LanguageCode
	contentType: VideoContentType
	currentTime: number
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
		currentTime,
		selectedSentenceId,
		selectedWordId,
		selectWord,
		plainSentences,
		subtitles,
	} = props

	return (
		<div className='watching-text-side'>
			<div className='watching-text-side__content'>
				{/*{contentType === 'text' && plainSentences && (
					<Sentences
						sentences={plainSentences}
						selectedSentenceId={selectedSentenceId}
						selectedWordId={selectedWordId}
						selectWord={selectWord}
						languageCode={languageCode}
					/>
				)}*/}
				{/*{contentType === 'subtitles' && subtitles?.subtitles && (
					<Subtitles
						subtitles={subtitles.subtitles}
						currentTime={currentTime}
						selectedSentenceId={selectedSentenceId}
						selectedWordId={selectedWordId}
						selectWord={selectWord}
						languageCode={languageCode}
					/>
				)}*/}
			</div>
		</div>
	)
}

export default SentencesOrSubtitles
