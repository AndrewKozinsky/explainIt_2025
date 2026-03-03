type ErrorIconProps = {
	extraClass?: string
}

export function ActionIcon(props: ErrorIconProps) {
	const { extraClass } = props

	return (
		<svg
			id='Layer_1'
			data-name='Layer 1'
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			className={extraClass}
		>
			<path
				d='m14.35,9.48l-4-3.84c-.2-.19-.52-.19-.71.01-.19.2-.18.52.01.71l3.27,3.14h-7.42c-.28,0-.5.22-.5.5s.22.5.5.5h7.17l-3.03,3.15c-.19.2-.19.52.01.71.1.09.22.14.35.14.13,0,.26-.05.36-.15l4-4.16c.09-.1.14-.22.14-.36,0-.13-.06-.26-.15-.35Z'
				fill='currentColor'
			/>
			<path
				d='m10,19c-4.96,0-9-4.04-9-9S5.04,1,10,1s9,4.04,9,9-4.04,9-9,9Zm0-17C5.59,2,2,5.59,2,10s3.59,8,8,8,8-3.59,8-8S14.41,2,10,2Z'
				fill='currentColor'
			/>
		</svg>
	)
}
