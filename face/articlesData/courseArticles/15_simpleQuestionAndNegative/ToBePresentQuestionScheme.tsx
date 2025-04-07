import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function ToBePresentQuestionScheme() {
	return (
		<ArtImage
			src={imageMapper.schemas.ToBePresentQuestion.src}
			alt={imageMapper.schemas.ToBePresentQuestion.alt}
		/>
	)
}

export default ToBePresentQuestionScheme
