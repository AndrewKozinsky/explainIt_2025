import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function ToBePresentPositiveScheme() {
	return (
		<ArtImage
			src={imageMapper.schemas.ToBePresentPositive.src}
			alt={imageMapper.schemas.ToBePresentPositive.alt}
		/>
	)
}

export default ToBePresentPositiveScheme
