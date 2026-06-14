import React from 'react'
import { ButtonIconProps } from 'ui/icons/buttonIcons/buttonProps'

function ArrowUpPureButtonIcon(props: ButtonIconProps) {
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
			<path
				d='M10.3535534,2.14644661 L16.8535534,8.64644661 C17.0488155,8.84170876 17.0488155,9.15829124 16.8535534,9.35355339 C16.6582912,9.54881554 16.3417088,9.54881554 16.1464466,9.35355339 L10.5,3.707 L10.5,17.5 C10.5,17.7761424 10.2761424,18 10,18 C9.72385763,18 9.5,17.7761424 9.5,17.5 L9.5,3.707 L3.85355339,9.35355339 C3.67998704,9.52711974 3.41056264,9.54640489 3.2156945,9.41140884 L3.14644661,9.35355339 C2.95118446,9.15829124 2.95118446,8.84170876 3.14644661,8.64644661 L9.64644661,2.14644661 C9.84170876,1.95118446 10.1582912,1.95118446 10.3535534,2.14644661 Z'
				fill='currentColor'
				fillRule='nonzero'
			></path>
		</svg>
	)
}

export default ArrowUpPureButtonIcon
