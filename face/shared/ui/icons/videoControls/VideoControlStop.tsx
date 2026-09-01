type ArrowProps = {
	extraClass?: string
}

export function VideoControlStop(props: ArrowProps) {
	const { extraClass } = props

	return (
		<svg
			width='6px'
			height='14px'
			viewBox='0 0 6 14'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<path
				d='M5,2 C5.55228475,2 6,2.44771525 6,3 L6,11 C6,11.5522847 5.55228475,12 5,12 C4.44771525,12 4,11.5522847 4,11 L4,3 C4,2.44771525 4.44771525,2 5,2 Z'
				fill='currentColor'
			></path>
			<path
				d='M1,2 C1.55228475,2 2,2.44771525 2,3 L2,11 C2,11.5522847 1.55228475,12 1,12 C0.44771525,12 0,11.5522847 0,11 L0,3 C0,2.44771525 0.44771525,2 1,2 Z'
				fill='currentColor'
			></path>
		</svg>
	)
}
