import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { useGetOnReadButtonClick, useIsReadButtonDisabled } from './fn/buttonLogic'

type ReadChapterButtonProps = {
	bookId: number
	chapterId: number
	hasContent: boolean
}

function ReadChapterButton(props: ReadChapterButtonProps) {
	const { bookId, chapterId, hasContent } = props

	const isButtonDisabled = useIsReadButtonDisabled(hasContent)
	const onButtonClick = useGetOnReadButtonClick(bookId, chapterId)

	return (
		<Button onClick={onButtonClick} disabled={isButtonDisabled}>
			Читать
		</Button>
	)
}

export default ReadChapterButton
