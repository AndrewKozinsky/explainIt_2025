type CheckIconProps = {
	extraClass?: string
}

/** Галочка пункта списка; цвет берётся из color родителя. */
export function CheckIcon(props: CheckIconProps) {
	const { extraClass } = props

	return (
		<svg width='20px' height='20px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' className={extraClass}>
			<path
				d='M4 10.5 L8 14.5 L16 5.5'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
