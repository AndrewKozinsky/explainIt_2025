import React from 'react'
import ExercisesType from '../../../../articlesData/exercisesType'
import './DictionaryWord.scss'

type DictionaryWordProps = {
	wordObj: ExercisesType.Word
}

// Абзац с английским словом, переводом и транскрипцией для заучивания
function DictionaryWord(props: DictionaryWordProps) {
	const { note, rusWord, engWord, transcription } = props.wordObj

	return (
		<div className='ex-dictionary-word'>
			{note && <p className='ex-dictionary-word__note'>{note}</p>}
			<p className='ex-dictionary-word__text'>
				<span className='ex-dictionary-word__rus'>{rusWord}</span>
				<span className='ex-dictionary-word__eng'>{engWord}</span>
				{transcription && <span className='ex-dictionary-word__transcription'>{transcription}</span>}
			</p>
		</div>
	)
}

export default DictionaryWord
