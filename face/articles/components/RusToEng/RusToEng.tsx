'use client'

import { RefObject, useRef } from 'react'
import cn from 'classnames'
import ArticleType from '../../articleTypes/articleType'
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

	const transcriptionBlockRef = useRef<HTMLDivElement>(null)
	const toggleTranscription = useGetToggleTranscription(transcriptionBlockRef)

	return (
		<div className={cn('art-rus-to-eng', props.config.offset && 'art-rus-to-eng--offset')}>
			<p className={cn(getRootClasses(config))}>
				{config.revert ? (
					<EngPart engSentenceParts={config.eng} toggleTranscription={toggleTranscription} />
				) : (
					<RusPart rusSentenceParts={config.rus} />
				)}
				<ArrowCircle />
				{config.revert ? (
					<RusPart rusSentenceParts={config.rus} />
				) : (
					<EngPart engSentenceParts={config.eng} toggleTranscription={toggleTranscription} />
				)}
			</p>
			<TranscriptionBlock engSentenceParts={config.eng} ref={transcriptionBlockRef} />
		</div>
	)
}

export default RusToEng

type RusPartProps = {
	rusSentenceParts: ArticleType.Text[]
}

function RusPart(props: RusPartProps) {
	const { rusSentenceParts } = props

	return rusSentenceParts.map((config, i) => {
		return <Text config={config} key={i} />
	})
}

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
	ref: RefObject<HTMLDivElement | null>
	engSentenceParts: ArticleType.Text[]
}

function TranscriptionBlock(props: TranscriptionBlockProps) {
	const { ref, engSentenceParts } = props

	const engTranscription = getEngTranscription(engSentenceParts)
	if (!engTranscription) {
		return null
	}

	return (
		<div className='art-rus-to-eng__transcription' ref={ref}>
			<Transcription engSentence={engTranscription.sentence} />
		</div>
	)
}
