import { useWatchingStore } from '../../../watchingStore'
import PlainTextContent from '../plainText/PlainTextContent/PlainTextContent'
import SubtitlesContent from '../subtitles/SubtitlesContent/SubtitlesContent'
import './TextSide.scss'

function TextSide() {
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)

	return (
		<div className='watching-text-side'>
			<div className='watching-text-side__content'>
				{populatedPlainText && <PlainTextContent />}
				{populatedSubtitles && <SubtitlesContent />}
			</div>
		</div>
	)
}

export default TextSide
