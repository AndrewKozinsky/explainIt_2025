import { DictionaryFlashcardData } from '_pages/dictionary/dictionaryStore'
import './DictionaryFlashcard.scss'

type DictionaryFlashcardProps = {
	flashcard: DictionaryFlashcardData
}

export function DictionaryFlashcard(props: DictionaryFlashcardProps) {
	const { flashcard } = props

	return (
		<div className='dictionary-flashcard' key={flashcard.id}>
			<Sentence flashcard={flashcard} />
			<Phrase flashcard={flashcard} />
			{/*<div>{flashcard.phraseAudioUrl}</div>*/}
			{/*<div>{flashcard.phraseTranslation}</div>*/}
			{/*<div>
				{flashcard.examples.map((example, index) => (
					<div key={index}>
						<div>{example.text}</div>
						<div>{example.translate}</div>
					</div>
				))}
			</div>*/}
		</div>
	)
}

function Sentence(props: DictionaryFlashcardProps) {
	const { flashcard } = props

	return (
		<div className='dictionary-flashcard__sentence'>
			<p className='dictionary-flashcard__sentence-text'>
				{flashcard.sentenceText.map((part, index) => (
					<span
						className={part.type === 'phrase' ? 'dictionary-flashcard__sentence-text-phrase' : ''}
						key={index}
					>
						{part.value}
					</span>
				))}
			</p>
			<p className='dictionary-flashcard__sentence-translate'>{flashcard.sentenceTranslation}</p>
		</div>
	)
}

function Phrase(props: DictionaryFlashcardProps) {
	const { flashcard } = props

	return (
		<p className='dictionary-flashcard__phrase'>
			{flashcard.phrase}
			<span className='dictionary-flashcard__phrase-transcription'>{flashcard.phraseTranscription}</span>
		</p>
	)
}
