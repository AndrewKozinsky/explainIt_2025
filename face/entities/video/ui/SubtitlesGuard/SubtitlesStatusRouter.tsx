import React from 'react'
import { SubtitlesStatusModelType } from '@/entities/video/repository/VideosRepository'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import './SubtitlesStatusRouter.scss'

type SubtitlesGuardProps = {
	children: React.ReactElement
	subtitlesStatus: SubtitlesStatusModelType
	subtitlesErrorCode: null | string
	durationSeconds: number
}

function SubtitlesStatusRouter(props: SubtitlesGuardProps) {
	const { children, subtitlesStatus, subtitlesErrorCode, durationSeconds } = props

	return (
		<StatusBlock type='info'>
			<div className='subtitles-status-router'>
				<div className='subtitles-status-router__info-top'>
					<p className='subtitles-status-router__info-top-left'>Субтитры готовятся</p>
					<p>~2:40</p>
				</div>
				<div className='subtitles-status-router__info-divider' />
				<p className='subtitles-status-router__info-bottom'>
					Они появятся автоматически. Вы можете начать смотреть без них или перейти на другую страницу.
				</p>
			</div>
		</StatusBlock>
	)

	if (subtitlesStatus === 'idle') {
		return (
			<StatusBlock type='info'>
				<p>Субтитров нет</p>
			</StatusBlock>
		)
	}

	if (subtitlesStatus === 'pending') {
		return (
			<StatusBlock type='info'>
				<p>Субтитры поставлены в очередь загрузки</p>
			</StatusBlock>
		)
	}

	if (subtitlesStatus === 'processing') {
		return (
			<StatusBlock type='info'>
				<p>Субтитры генерируются</p>
			</StatusBlock>
		)
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
