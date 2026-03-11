type ErrorIconProps = {
	extraClass?: string
}

export function BigPlusIcon(props: ErrorIconProps) {
	const { extraClass } = props

	return (
		<svg
			width='40px'
			height='40px'
			viewBox='0 0 40 40'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			className={extraClass}
		>
			<path
				d='M20,0 C21.1045695,0 22,0.8954305 22,2 L22,18 L38,18 C39.1045695,18 40,18.8954305 40,20 C40,21.1045695 39.1045695,22 38,22 L22,22 L22,38 C22,39.1045695 21.1045695,40 20,40 C18.8954305,40 18,39.1045695 18,38 L18,22 L2,22 C0.8954305,22 0,21.1045695 0,20 C0,18.8954305 0.8954305,18 2,18 L18,18 L18,2 C18,0.8954305 18.8954305,0 20,0 Z'
				fill='currentColor'
			></path>
		</svg>
	)
}
