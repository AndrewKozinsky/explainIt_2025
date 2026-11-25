type CheckMarkIconProps = {
	extraClass?: string
}

export function CheckMarkIcon({ extraClass }: CheckMarkIconProps) {
	return (
		<svg
			width='12'
			height='10'
			viewBox='0 -1.166 12 10'
			xmlns='http://www.w3.org/2000/svg'
			className={extraClass}
			aria-hidden='true'
		>
			<path
				d='M1.29627952,2.9790858 L0,4.53121215 L4.65713361,8.8312 C4.65713361,8.8312 7.71556131,3.11457657 12,0.165225925 L11.1773536,-1.166 C11.1773536,-1.166 5.66612747,2.66850524 4.06742155,4.84179271 L1.29627952,2.9790858 Z'
				fill='currentColor'
			/>
		</svg>
	)
}
