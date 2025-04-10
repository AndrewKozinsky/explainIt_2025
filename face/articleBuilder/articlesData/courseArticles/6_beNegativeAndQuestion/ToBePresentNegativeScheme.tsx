import React from 'react'
import ArtImage from '../../../components/Image/ArtImage'
import { imageMapper } from '../../../../utils/imageMapper'

function ToBePresentNegativeScheme() {
	return (
		<ArtImage src={imageMapper.schemas.ToBePresentNegative.src} alt={imageMapper.schemas.ToBePresentNegative.alt} />
	)
}

export default ToBePresentNegativeScheme
