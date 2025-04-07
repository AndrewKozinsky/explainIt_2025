import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function ToBeFutureTable() {
	return (
		<ArtImage src={imageMapper.tables.ToBeFuture.src} alt={imageMapper.tables.ToBePast.alt} />
	)
}

export default ToBeFutureTable
