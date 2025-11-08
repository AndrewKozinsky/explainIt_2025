import Button from '@/ui/formRelated/buttons/Button/Button'
import { useGetOnReadButtonClick, useIsReadButtonDisabled } from './fn/buttonLogic'

function ReadChapterNextButton() {
	const isButtonDisabled = useIsReadButtonDisabled()
	const onButtonClick = useGetOnReadButtonClick()

	return (
		<Button onClick={onButtonClick} disabled={isButtonDisabled}>
			Читать Next
		</Button>
	)
}

export default ReadChapterNextButton
