import React from 'react'
import { ButtonIconProps } from 'ui/icons/buttonIcons/buttonProps'

function MicButtonIcon(props: ButtonIconProps) {
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
			<defs>
				<path d='M0,0 L20,0 L20,20 L0,20 L0,0 Z' id='path-1'></path>
			</defs>
			<g id='micButtonIcon' stroke='none' fill='none' xlinkHref='#path-1'>
				<path
					d='M15,10.6 C15.2209139,10.6 15.4,10.7790861 15.4,11 C15.4,13.8364251 13.0176748,16.1490259 9.99973774,16.3808841 L10,18 L11.5,18 C11.7761424,18 12,18.2238576 12,18.5 C12,18.7761424 11.7761424,19 11.5,19 L7.5,19 C7.22385763,19 7,18.7761424 7,18.5 C7,18.2238576 7.22385763,18 7.5,18 L9,18 L8.99925753,16.3808069 C5.98179648,16.1485126 3.6,13.8361104 3.6,11 C3.6,10.7790861 3.7790861,10.6 4,10.6 C4.2209139,10.6 4.4,10.7790861 4.4,11 C4.4,13.5315537 6.67529088,15.6 9.5,15.6 C12.3247091,15.6 14.6,13.5315537 14.6,11 C14.6,10.7790861 14.7790861,10.6 15,10.6 Z M9.5,1 C11.9852814,1 14,3.01471863 14,5.5 L14,10.5 C14,12.9852814 11.9852814,15 9.5,15 C7.01471863,15 5,12.9852814 5,10.5 L5,5.5 C5,3.01471863 7.01471863,1 9.5,1 Z M9.5,2 C7.56700338,2 6,3.56700338 6,5.5 L6,10.5 C6,12.4329966 7.56700338,14 9.5,14 C11.4329966,14 13,12.4329966 13,10.5 L13,5.5 C13,3.56700338 11.4329966,2 9.5,2 Z'
					id='Combined-Shape'
					fill='currentColor'
					fillRule='nonzero'
				></path>
			</g>
		</svg>
	)
}

export default MicButtonIcon
