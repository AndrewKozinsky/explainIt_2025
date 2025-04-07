import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function PresentSimpleFullTable() {
	return (
		<ArtImage
			src={imageMapper.tables.PossessivePronouns.src}
			alt={imageMapper.tables.PossessivePronouns.alt}
		/>
	)
}

export default PresentSimpleFullTable
