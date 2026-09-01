import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import Paragraph from '@/shared/ui/Paragraph/Paragraph'

export function PendingSubtitles() {
	return (
		<StatusBlock type='info'>
			<Paragraph fontSize={16} lineHeight={20}>
				Субтитры добавлены в очередь на генерацию.
			</Paragraph>
		</StatusBlock>
	)
}
