import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetHintText, useGetHintVisibility } from './fn/paragraphVisibilityAndText'
import './HintBlock.scss'

function HintBlock() {
	const isHintVisible = useGetHintVisibility()
	const hintText = useGetHintText()

	if (!isHintVisible) return null

	return (
		<Paragraph fontSize={14} extraClass='translate-phrase-hint'>
			{hintText}
		</Paragraph>
	)
}

export default HintBlock
