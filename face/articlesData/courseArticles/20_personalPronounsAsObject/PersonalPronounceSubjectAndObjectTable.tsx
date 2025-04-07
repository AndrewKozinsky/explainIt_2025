import React from 'react'
import ArtImage from '../../../articleBuilder/components/Image/ArtImage'
import { imageMapper } from '../../../utils/imageMapper'

function PersonalPronounceSubjectAndObjectTable() {
	return (
		<ArtImage
			src={imageMapper.tables.PersonalPronounceSubjectAndObject.src}
			alt={imageMapper.tables.PersonalPronounceSubjectAndObject.alt}
		/>
	)
}

export default PersonalPronounceSubjectAndObjectTable
