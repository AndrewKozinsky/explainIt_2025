import React from 'react'

type ErrorIconProps = {
	extraClass?: string
}

export function SuccessIcon(props: ErrorIconProps) {
	const { extraClass } = props

	return (
		<svg
			width='20px'
			height='20px'
			viewBox='0 0 20 20'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			className={extraClass}
		>
			<path
				d='M1,10 C1,5.0293 5.0284,1 10,1 C14.9698,1 19,5.0293 19,10 C19,14.9707 14.9698,19 10,19 C5.0284,19 1,14.9707 1,10 Z'
				fill='#6A9956'
				fillRule='nonzero'
			></path>
			<path
				d='M14.6464466,6.64644661 C14.8417088,6.45118446 15.1582912,6.45118446 15.3535534,6.64644661 C15.5488155,6.84170876 15.5488155,7.15829124 15.3535534,7.35355339 L9.35355339,13.3535534 C9.15829124,13.5488155 8.84170876,13.5488155 8.64644661,13.3535534 L5.64644661,10.3535534 C5.45118446,10.1582912 5.45118446,9.84170876 5.64644661,9.64644661 C5.84170876,9.45118446 6.15829124,9.45118446 6.35355339,9.64644661 L9,12.293 L14.6464466,6.64644661 Z'
				fill='#FFFFFF'
				fillRule='nonzero'
			></path>
		</svg>
	)
}
