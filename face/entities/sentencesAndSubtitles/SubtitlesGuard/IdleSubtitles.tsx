import Paragraph from '@/shared/ui/Paragraph/Paragraph'
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock'

export function IdleSubtitles() {
	return (
		<StatusBlock type='info'>
			<Paragraph fontSize={16} lineHeight={20}>
				Генерация субтитров не начата.
			</Paragraph>
		</StatusBlock>
	)
}
