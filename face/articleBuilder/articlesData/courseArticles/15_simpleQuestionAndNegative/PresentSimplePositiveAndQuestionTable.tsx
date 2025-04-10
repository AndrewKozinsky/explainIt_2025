import React from 'react'
import ArtImage from '../../../components/Image/ArtImage'
import { imageMapper } from '../../../../utils/imageMapper'

function PresentSimplePositiveAndQuestionTable() {
	return (
		<ArtImage
			src={imageMapper.tables.PresentSimplePositiveAndQuestion.src}
			alt={imageMapper.tables.PresentSimplePositiveAndQuestion.alt}
		/>
	)
}

export default PresentSimplePositiveAndQuestionTable
