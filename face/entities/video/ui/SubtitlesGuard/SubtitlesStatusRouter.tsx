import React from 'react'
import { SubtitlesStatusModelType } from '@/entities/video/repository/VideosRepository'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import { ProcessedSubtitles } from './ProcessedSubtitles'
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
		return (
			<StatusBlock type='info'>
				<p>Субтитров нет</p>
			</StatusBlock>
		)
	}

	if (subtitlesStatus === 'pending' || subtitlesStatus === 'processing') {
		return <ProcessedSubtitles subtitlesStatus={subtitlesStatus} durationSeconds={durationSeconds} />
	}

	if (subtitlesStatus === 'failed') {
		return (
			<StatusBlock type='error'>
				<ErrorMessage text={subtitlesErrorCode} />
			</StatusBlock>
		)
	}

	return <div>{children}</div>
}

export default SubtitlesStatusRouter
