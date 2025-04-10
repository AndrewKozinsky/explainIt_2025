import React from 'react'
import ArtImage from '../../../components/Image/ArtImage'
import { imageMapper } from '../../../../utils/imageMapper'

function PersonalPronounceSubjectTable() {
	return (
		<ArtImage
			src={imageMapper.tables.PersonalPronounceSubject.src}
			alt={imageMapper.tables.PersonalPronounceSubject.alt}
		/>
	)
}

export default PersonalPronounceSubjectTable
