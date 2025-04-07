import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function PastSimpleFullTable() {
	return (
		<ArtImage
			src={imageMapper.tables.PastSimpleFull.src}
			alt={imageMapper.tables.PastSimpleFull.alt}
		/>
	)
}

export default PastSimpleFullTable
