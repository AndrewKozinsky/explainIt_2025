// import React from 'react'
// import { SubtitlesStatusModelType } from '@/entities/video/repository/VideosRepository'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import InfoBlock from '@/shared/ui/InfoBlock/InfoBlock'

/*type SubtitlesGuardProps = {
	children: React.ReactElement
	subtitlesStatus: SubtitlesStatusModelType
	subtitlesErrorCode: null | string
}*/

/*function SubtitlesGuard(props: SubtitlesGuardProps) {
	const { children, subtitlesStatus, subtitlesErrorCode } = props

	if (subtitlesStatus === 'idle') {
		return <InfoBlock type='info'>Субтитров нет</InfoBlock>
	}

	if (subtitlesStatus === 'pending') {
		return <InfoBlock type='info'>Субтитры поставлены в очередь загрузки</InfoBlock>
	}

	if (subtitlesStatus === 'processing') {
		return <InfoBlock type='info'>Субтитры генерируются</InfoBlock>
	}

	if (subtitlesStatus === 'failed') {
		return <ErrorMessage text={subtitlesErrorCode} />
	}

	return <div>{children}</div>
}*/

// export default SubtitlesGuard
