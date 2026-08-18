import React from 'react'
import { SubtitlesStatusModelType } from '@/entities/video/repository/VideosRepository'
import { ProcessedSubtitles } from './ProcessedSubtitles'
import { PendingSubtitles } from './PendingSubtitles'
import { IdleSubtitles } from './IdleSubtitles'
import { FailedSubtitles } from './FailedSubtitles'
import './SubtitlesStatusRouter.scss'

type SubtitlesGuardProps = {
	children: React.ReactElement
	subtitlesStatus: SubtitlesStatusModelType
	subtitlesErrorCode: null | string
	durationSeconds: number
}

function SubtitlesStatusRouter(props: SubtitlesGuardProps) {
	const { children, subtitlesStatus, subtitlesErrorCode, durationSeconds } = props

	if (subtitlesStatus === 'idle') {
		return <IdleSubtitles />
	}

	if (subtitlesStatus === 'pending') {
		return <PendingSubtitles />
	}

	if (subtitlesStatus === 'processing') {
		return <ProcessedSubtitles durationSeconds={durationSeconds} />
	}

	if (subtitlesStatus === 'failed') {
		return <FailedSubtitles errorCode={subtitlesErrorCode} />
	}

	return <div>{children}</div>
}

export default SubtitlesStatusRouter
