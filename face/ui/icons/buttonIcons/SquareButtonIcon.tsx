import React from 'react'
import { ButtonIconProps } from 'ui/icons/buttonIcons/buttonProps'

function SquareButtonIcon(props: ButtonIconProps) {
	const { extraClass } = props

	return (
		<svg
			width='20px'
			height='20px'
			viewBox='0 0 20 20'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<title>squareButtonIcon</title>
			<defs>
				<path d='M0,0 L20,0 L20,20 L0,20 L0,0 Z' id='path-1'></path>
			</defs>
			<g id='squareButtonIcon' stroke='none' fill='none' xlinkHref='#path-1'>
				<path
					d='M14,3 C15.6568542,3 17,4.34314575 17,6 L17,14 C17,15.6568542 15.6568542,17 14,17 L6,17 C4.34314575,17 3,15.6568542 3,14 L3,6 C3,4.34314575 4.34314575,3 6,3 L14,3 Z M14,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,14 C4,15.1045695 4.8954305,16 6,16 L14,16 C15.1045695,16 16,15.1045695 16,14 L16,6 C16,4.8954305 15.1045695,4 14,4 Z'
					fill='currentColor'
					fillRule='nonzero'
				></path>
			</g>
		</svg>
	)
}

export default SquareButtonIcon
