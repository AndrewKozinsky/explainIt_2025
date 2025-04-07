import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function PastSimplePositiveAndQuestionTable() {
	return (
		<ArtImage
			src={imageMapper.tables.PastSimplePositiveAndQuestion.src}
			alt={imageMapper.tables.PastSimplePositiveAndQuestion.alt}
		/>
	)
}

export default PastSimplePositiveAndQuestionTable
