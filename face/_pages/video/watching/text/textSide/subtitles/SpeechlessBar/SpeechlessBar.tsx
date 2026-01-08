import cn from 'classnames'
import React from 'react'
import './SpeechlessBar.scss'

type SpeechlessBarProps = {
	isCurrent: boolean
}

function SpeechlessBar(props: SpeechlessBarProps) {
	const { isCurrent } = props

	return <div className={cn('speechless-bar', isCurrent && 'speechless-bar--active')} />
}

export default SpeechlessBar
