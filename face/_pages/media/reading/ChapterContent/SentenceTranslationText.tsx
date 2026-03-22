import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'

type SentenceTranslationTextProps = {
	translation: ChapterTextStructurePopulated.Sentence['translation']
}

function SentenceTranslationText(props: SentenceTranslationTextProps) {
	const { translation } = props

	if (!translation.sentenceTranslation) {
		return null
	}

	return <p className='chapter-content__sentence-translation'>{translation.sentenceTranslation}</p>
}

export default SentenceTranslationText
