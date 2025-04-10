import React from 'react'
import ArtImage from '../../../components/Image/ArtImage'
import { imageMapper } from '../../../../utils/imageMapper'

function ToBePresentTable() {
	return <ArtImage src={imageMapper.tables.ToBePresent.src} alt={imageMapper.tables.ToBePresent.alt} />
}

export default ToBePresentTable
