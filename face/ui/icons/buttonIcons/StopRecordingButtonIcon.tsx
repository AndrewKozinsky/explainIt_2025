import React from 'react'
import { ButtonIconProps } from 'ui/icons/buttonIcons/buttonProps'

function StopRecordingButtonIcon(props: ButtonIconProps) {
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
				d='M10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 Z M10,3 C6.13400675,3 3,6.13400675 3,10 C3,13.8659932 6.13400675,17 10,17 C13.8659932,17 17,13.8659932 17,10 C17,6.13400675 13.8659932,3 10,3 Z'
				fill='currentColor'
				fillRule='nonzero'
			></path>
			<path
				d='M10,5 C12.7614237,5 15,7.23857625 15,10 C15,12.7614237 12.7614237,15 10,15 C7.23857625,15 5,12.7614237 5,10 C5,7.23857625 7.23857625,5 10,5 Z'
				fill='currentColor'
				fillRule='evenodd'
			></path>
		</svg>
	)
}

export default StopRecordingButtonIcon
