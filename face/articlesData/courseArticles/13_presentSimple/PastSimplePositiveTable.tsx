import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function PastSimplePositiveTable() {
	return (
		<ArtImage
			src={imageMapper.tables.PastSimplePositive.src}
			alt={imageMapper.tables.PastSimplePositive.alt}
		/>
	)
}

export default PastSimplePositiveTable
