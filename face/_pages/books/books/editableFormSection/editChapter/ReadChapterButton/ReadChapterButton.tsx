import { BookChapterOutModel } from 'graphql'
import React from 'react'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { useGetOnReadButtonClick, useIsReadButtonDisabled } from './fn/buttonLogic'

type ReadChapterButtonProps = {
	chapter: BookChapterOutModel
}
function ReadChapterButton(props: ReadChapterButtonProps) {
	const { chapter } = props

	const isButtonDisabled = useIsReadButtonDisabled(chapter)
	const onButtonClick = useGetOnReadButtonClick()

	return (
		<Button onClick={onButtonClick} disabled={isButtonDisabled}>
			Читать
		</Button>
	)
}

export default ReadChapterButton
