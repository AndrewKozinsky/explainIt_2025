import React from 'react'
import { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

function ArrowRightPureButtonIcon(props: ButtonIconProps) {
	const { extraClass } = props

	return (
		<svg
			className={extraClass}
			width='20px'
			height='20px'
			viewBox='0 0 20 20'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<title>arrowRightPureButtonIcon</title>
			<defs>
				<path d='M0,0 L20,0 L20,20 L0,20 L0,0 Z' id='path-1'></path>
			</defs>
			<g id='arrowRightPureButtonIcon' stroke='none' fill='none' xlinkHref='#path-1' fillRule='nonzero'>
				<path
					d='M14.6035534,6.39644661 L21.1035534,12.8964466 C21.2988155,13.0917088 21.2988155,13.4082912 21.1035534,13.6035534 C20.9082912,13.7988155 20.5917088,13.7988155 20.3964466,13.6035534 L14.75,7.956 L14.75,21.75 C14.75,22.0261424 14.5261424,22.25 14.25,22.25 C13.9738576,22.25 13.75,22.0261424 13.75,21.75 L13.75,7.956 L8.10355339,13.6035534 C7.92998704,13.7771197 7.66056264,13.7964049 7.4656945,13.6614088 L7.39644661,13.6035534 C7.20118446,13.4082912 7.20118446,13.0917088 7.39644661,12.8964466 L13.8964466,6.39644661 C14.0917088,6.20118446 14.4082912,6.20118446 14.6035534,6.39644661 Z'
					id='Combined-Shape'
					fill='currentColor'
					transform='translate(14.25, 10) rotate(90) translate(-14.25, -10)'
				></path>
			</g>
		</svg>
	)
}

export default ArrowRightPureButtonIcon
