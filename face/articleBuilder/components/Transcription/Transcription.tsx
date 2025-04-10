'use client'

import Image from 'next/image'
import React from 'react'
import transcriptionService from '../../transcriptionService/transcriptionService'
import { getComponentTexts, useGetAudioPlaying } from './fn/transcriptionLogic'
import playSign from './images/play.svg'
import pauseSign from './images/pause.svg'
import './Transcription.scss'

type TranscriptionProps = {
	engSentence: string
}

function Transcription(props: TranscriptionProps) {
	const { engSentence } = props

	const { isPlay, playPauseHandler, progress } = useGetAudioPlaying(transcriptionService.cleanString(engSentence))

	const transcriptionData = transcriptionService.getTranscriptionBySentence(engSentence)
	if (!transcriptionData) {
		return null
	}

	const { engWords, transcriptionWords } = getComponentTexts(transcriptionData)

	return (
		<div className='transcription'>
			{transcriptionData.audio && <AudioButton isPlay={isPlay} playPauseHandler={playPauseHandler} />}
			<div className='transcription__content'>
				<div className='transcription__content-inner'>
					{engWords.map((engWord, i) => {
						return (
							<span className='transcription__content-words' key={i}>
								<span className='transcription__content-eng-word'>{engWord}</span>
								<span className='transcription__content-transcription-word'>
									{transcriptionWords[i]}
								</span>
							</span>
						)
					})}
				</div>
				<div className='transcription__audio-progress' style={{ width: progress + '%' }} />
			</div>
		</div>
	)
}

export default Transcription

type AudioButtonProps = {
	isPlay: boolean
	playPauseHandler: () => void
}

function AudioButton(props: AudioButtonProps) {
	const { isPlay, playPauseHandler } = props

	const sign = isPlay ? pauseSign : playSign

	return (
		<button className='transcription__audio-button' onClick={playPauseHandler}>
			<Image src={sign} alt='play sign' />
		</button>
	)
}
