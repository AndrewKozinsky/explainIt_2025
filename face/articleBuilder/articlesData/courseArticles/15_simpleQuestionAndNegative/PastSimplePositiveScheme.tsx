import React from 'react'
import ArtImage from '../../../components/Image/ArtImage'
import { imageMapper } from '../../../../utils/imageMapper'

function PastSimplePositiveScheme() {
	return (
		<ArtImage src={imageMapper.schemas.PastSimplePositive.src} alt={imageMapper.schemas.PastSimplePositive.alt} />
	)
}

export default PastSimplePositiveScheme
