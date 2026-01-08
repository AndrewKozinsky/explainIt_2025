import cn from 'classnames'
import React from 'react'
import './SpeechlessBar.scss'

type SpeechlessBarProps = {
	isCurrent: boolean
	subtitleId: number
}

function SpeechlessBar(props: SpeechlessBarProps) {
	const { isCurrent, subtitleId } = props

	return <div className={cn('speechless-bar', isCurrent && 'speechless-bar--active')} data-subtitle-id={subtitleId} />
}

export default SpeechlessBar
