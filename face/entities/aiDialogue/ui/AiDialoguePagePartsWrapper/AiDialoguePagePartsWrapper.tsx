import { ReactNode } from 'react'
import './AiDialoguePagePartsWrapper.scss'

type AiDialoguePagePartsWrapperProps = {
	children: [ReactNode, ReactNode]
}

function AiDialoguePagePartsWrapper(props: AiDialoguePagePartsWrapperProps) {
	const [left, right] = props.children

	return (
		<div className='ai-dialogue-page-parts-wrapper'>
			<div className='ai-dialogue-page-parts-wrapper__left'>{left}</div>
			<div className='ai-dialogue-page-parts-wrapper__right'>{right}</div>
		</div>
	)
}

export default AiDialoguePagePartsWrapper
