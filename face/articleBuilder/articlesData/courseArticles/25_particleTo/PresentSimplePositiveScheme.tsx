import React from 'react'
import ArtImage from '../../../components/Image/ArtImage'
import { imageMapper } from '../../../../utils/imageMapper'

function PresentSimplePositiveScheme() {
	return (
		<ArtImage
			src={imageMapper.schemas.PresentSimplePositive.src}
			alt={imageMapper.schemas.PresentSimplePositive.alt}
		/>
	)
}

export default PresentSimplePositiveScheme
