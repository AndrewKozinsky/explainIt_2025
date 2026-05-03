import TranscriptionAndAudio from 'ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { LanguageCode } from 'utils/utils'
import { DictionaryFlashcardData } from '_pages/dictionary/dictionaryStore'
import DeleteFlashcardButton from '../DeleteFlashcardButton/DeleteFlashcardButton'
import './DictionaryFlashcard.scss'

type DictionaryFlashcardProps = {
	flashcard: DictionaryFlashcardData
}

export function DictionaryFlashcard(props: DictionaryFlashcardProps) {
	const { flashcard } = props

	return (
		<div className='dictionary-flashcard' key={flashcard.id}>
			<div className='dictionary-flashcard__content'>
				<Sentence flashcard={flashcard} />
				<Phrase flashcard={flashcard} />
				<Examples flashcard={flashcard} />
			</div>
			<DeleteFlashcardButton flashcardId={flashcard.id} />
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
			<TranscriptionAndAudio
				phrase={flashcard.phrase}
				languageCode={flashcard.languageCode as LanguageCode}
				audioUrl={flashcard.phraseAudioUrl || null}
				transcription={{ status: 'ready', transcription: flashcard.phraseTranscription || null }}
				extraClass='dictionary-flashcard__phrase-transcription'
			/>
			{flashcard.phraseTranslation}
		</p>
	)
}

function Examples(props: DictionaryFlashcardProps) {
	const { flashcard } = props

	return (
		<div className='dictionary-flashcard__examples'>
			{flashcard.examples.map((example, index) => {
				return (
					<p key={index}>
						{example.text} — {example.translate}
					</p>
				)
			})}
		</div>
	)
}
