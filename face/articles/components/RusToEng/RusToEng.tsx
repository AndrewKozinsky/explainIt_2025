'use client'

import React, { RefObject, useRef } from 'react'
import cn from 'classnames'
import ArticleType from '../../articleTypes/articleType'
import ArrowCircle from '../ArrowCircle/ArrowCircle'
import Text from '../Text/Text'
import Transcription from '../Transcription/Transcription'
import { getEngTranscriptionBlock, getRootClasses, useGetToggleTranscription } from './fn/componentHandlers'
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
				{config.parts.map((part, i) => {
					return (
						<React.Fragment key={i}>
							{'rus' in part ? (
								<RusPart rusSentenceParts={part.rus} />
							) : (
								<EngPart engSentenceParts={part.eng} toggleTranscription={toggleTranscription} />
							)}
							{i < config.parts.length - 1 ? <ArrowCircle /> : null}
						</React.Fragment>
					)
				})}
			</p>
			<TranscriptionBlockWrapper config={config} transcriptionBlockRef={transcriptionBlockRef} />
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

	const transcriptionBlock = getEngTranscriptionBlock(engSentenceParts)

	if (transcriptionBlock?.transcription) {
		return (
			<span className='art-rus-to-eng__pseudo-link' onClick={toggleTranscription}>
				{markup}
			</span>
		)
	} else {
		return markup
	}
}

type TranscriptionBlockWrapperProps = {
	config: ArticleType.RusToEng
	transcriptionBlockRef: RefObject<HTMLDivElement | null>
}

function TranscriptionBlockWrapper(props: TranscriptionBlockWrapperProps) {
	const { config, transcriptionBlockRef } = props

	const englishSentence = config.parts.find((part) => {
		return 'eng' in part
	})
	if (!englishSentence) return null

	return <TranscriptionBlock engSentenceParts={englishSentence.eng} ref={transcriptionBlockRef} />
}

type TranscriptionBlockProps = {
	ref: RefObject<HTMLDivElement | null>
	engSentenceParts: ArticleType.Text[]
}

function TranscriptionBlock(props: TranscriptionBlockProps) {
	const { ref, engSentenceParts } = props

	const transcriptionBlock = getEngTranscriptionBlock(engSentenceParts)
	if (!transcriptionBlock || !transcriptionBlock.transcription) {
		return null
	}

	return (
		<div className='art-rus-to-eng__transcription' ref={ref}>
			<Transcription engSentence={transcriptionBlock.sentence} />
		</div>
	)
}
