import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'

type FailedSubtitlesProps = {
	errorCode: null | string
}

export function FailedSubtitles(props: FailedSubtitlesProps) {
	const { errorCode = 'Ошибка при генерации субтитров' } = props

	return (
		<StatusBlock type='error'>
			<ErrorMessage text={errorCode} />
		</StatusBlock>
	)
}
