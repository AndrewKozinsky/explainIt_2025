'use client'

import { useRef } from 'react'
import cn from 'classnames'
import ArticleType from '../../articlesData/articleType'
import ArrowCircle from '../ArrowCircle/ArrowCircle'
import Text from '../Text/Text'
import Transcription from '../Transcription/Transcription'
import { getEngTranscription, getRootClasses, useGetToggleTranscription } from './fn/componentHandlers'
import './RusToEng.scss'

type RusToEngProps = {
	config: ArticleType.RusToEng
}

/** Компонент абзаца в статье */
function RusToEng(props: RusToEngProps) {
	const { config } = props

	const { isTranscriptionOpen, toggleTranscription } = useGetToggleTranscription()

	return (
		<div>
			<p className={cn(getRootClasses(config))}>
				{config.rus.map((config, i) => {
					return <Text config={config} key={i} />
				})}
				<ArrowCircle />
				<EngPart engSentenceParts={config.eng} toggleTranscription={toggleTranscription} />
			</p>
			<TranscriptionBlock engSentenceParts={config.eng} isOpen={isTranscriptionOpen} />
		</div>
	)
}

export default RusToEng

type EngPartProps = {
	engSentenceParts: ArticleType.Text[]
	toggleTranscription: () => void
}

function EngPart(props: EngPartProps) {
	const { engSentenceParts, toggleTranscription } = props

	const markup = engSentenceParts.map((config, i) => {
		return <Text config={config} key={i} />
	})

	if (getEngTranscription(engSentenceParts)) {
		return (
			<span className='art-rus-to-eng__pseudo-link' onClick={toggleTranscription}>
				{markup}
			</span>
		)
	} else {
		return markup
	}
}

type TranscriptionBlockProps = {
	isOpen: boolean
	engSentenceParts: ArticleType.Text[]
}

function TranscriptionBlock(props: TranscriptionBlockProps) {
	const { isOpen, engSentenceParts } = props

	const transcriptionBlockRef = useRef<HTMLDivElement>(null)

	const engTranscription = getEngTranscription(engSentenceParts)
	if (!engTranscription || !isOpen) {
		return null
	}

	return (
		<div className='art-rus-to-eng__transcription' ref={transcriptionBlockRef}>
			<Transcription engSentence={engTranscription.sentence} />
		</div>
	)
}
