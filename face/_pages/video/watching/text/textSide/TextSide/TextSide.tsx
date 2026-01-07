import React from 'react'
import FullScreenButton from '../FullScreenButton/FullScreenButton'
import './TextSide.scss'

function TextSide() {
	return (
		<div className='watching-text-side'>
			<div className='watching-text-side__content'></div>
			<div className='watching-text-side__bottom'>
				<div className='watching-text-side__bottom-buttons'>Left</div>
				<div className='watching-text-side__bottom-info'>
					<FullScreenButton />
				</div>
			</div>
		</div>
	)
}

export default TextSide
