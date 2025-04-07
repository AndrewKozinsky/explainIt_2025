import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function FutureSimplePositiveScheme() {
	return (
		<ArtImage
			src={imageMapper.tables.FutureSimplePositive.src}
			alt={imageMapper.tables.FutureSimplePositive.alt}
		/>
	)
}

export default FutureSimplePositiveScheme
