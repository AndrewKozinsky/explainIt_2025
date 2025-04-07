import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function FutureSimpleQuestionScheme() {
	return (
		<ArtImage
			src={imageMapper.tables.FutureSimpleQuestion.src}
			alt={imageMapper.tables.FutureSimpleQuestion.alt}
		/>
	)
}

export default FutureSimpleQuestionScheme
