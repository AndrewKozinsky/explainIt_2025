import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import Paragraph from '@/shared/ui/Paragraph/Paragraph'

export function IdleSubtitles() {
	return (
		<StatusBlock type='info'>
			<Paragraph fontSize={16} lineHeight={20}>
				Генерация субтитров не начата.
			</Paragraph>
		</StatusBlock>
	)
}
