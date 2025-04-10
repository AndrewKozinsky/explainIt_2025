import React from 'react'
import transcriptionService from '../../transcriptionService/transcriptionService'
import { getComponentTexts } from './fn/transcriptionLogic'
import './Transcription.scss'

type TranscriptionProps = {
	engSentence: string
}

function Transcription(props: TranscriptionProps) {
	const { engSentence } = props

	const transcriptionData = transcriptionService.getTranscriptionBySentence(engSentence)
	if (!transcriptionData) {
		return null
	}

	const { engWords, transcriptionWords } = getComponentTexts(transcriptionData)

	return (
		<div className='transcription'>
			<p className='transcription__content'>
				{engWords.map((engWord, i) => {
					return (
						<span className='transcription__content-words' key={i}>
							<span className='transcription__content-eng-word'>{engWord}</span>
							<span className='transcription__content-transcription-word'>{transcriptionWords[i]}</span>
						</span>
					)
				})}
			</p>
		</div>
	)
}

export default Transcription
