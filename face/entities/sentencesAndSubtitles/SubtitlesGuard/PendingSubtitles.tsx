import Paragraph from '@/shared/ui/Paragraph/Paragraph'
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock'

export function PendingSubtitles() {
	return (
		<StatusBlock type='info'>
			<Paragraph fontSize={16} lineHeight={20}>
				Субтитры добавлены в очередь на генерацию.
			</Paragraph>
		</StatusBlock>
	)
}
