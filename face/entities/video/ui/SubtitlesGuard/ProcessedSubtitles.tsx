import { SubtitlesStatusModelType } from '@/entities/video/lib/types'
import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import { useSubtitlesCountdown } from './fn/useSubtitlesCountdown'

type ProcessedSubtitlesProps = {
	subtitlesStatus: SubtitlesStatusModelType
	durationSeconds: number
}

export function ProcessedSubtitles(props: ProcessedSubtitlesProps) {
	const { subtitlesStatus, durationSeconds } = props

	const countdown = useSubtitlesCountdown(durationSeconds, subtitlesStatus)

	return (
		<StatusBlock type='info'>
			<div className='subtitles-status-router'>
				<div className='subtitles-status-router__info-top'>
					<p className='subtitles-status-router__info-top-left'>Субтитры готовятся</p>
					{countdown && <p>~{countdown}</p>}
				</div>
				<div className='subtitles-status-router__info-divider' />
				<p className='subtitles-status-router__info-bottom'>
					Они появятся автоматически. Вы можете начать смотреть без них или перейти на другую страницу.
				</p>
			</div>
		</StatusBlock>
	)
}
