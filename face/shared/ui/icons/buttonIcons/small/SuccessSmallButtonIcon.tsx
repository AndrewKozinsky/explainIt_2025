import { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function SuccessSmallButtonIcon(props: ButtonIconProps) {
	const { extraClass } = props

	return (
		<svg
			className={extraClass}
			aria-hidden='true'
			width='14px'
			height='14px'
			viewBox='0 0 14 14'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<defs>
				<path d='M0,0 L14,0 L14,14 L0,14 L0,0 Z' id='path-1'></path>
			</defs>
			<g stroke='none' fill='none' xlinkHref='#path-1'>
				<path fill='#FFFFFF' fillRule='evenodd' opacity='0.100000001' d='M0,0 H14 V14 H0 Z'></path>
				<path
					d='M1,7 C1,3.6862 3.6856,1 7,1 C10.3132,1 13,3.6862 13,7 C13,10.3138 10.3132,13 7,13 C3.6856,13 1,10.3138 1,7 Z'
					fill='#5FC623'
					fillRule='nonzero'
				></path>
				<path
					d='M9.64644661,4.64644661 C9.84170876,4.45118446 10.1582912,4.45118446 10.3535534,4.64644661 C10.5488155,4.84170876 10.5488155,5.15829124 10.3535534,5.35355339 L6.35355339,9.35355339 C6.15829124,9.54881554 5.84170876,9.54881554 5.64644661,9.35355339 L3.64644661,7.35355339 C3.45118446,7.15829124 3.45118446,6.84170876 3.64644661,6.64644661 C3.84170876,6.45118446 4.15829124,6.45118446 4.35355339,6.64644661 L6,8.293 L9.64644661,4.64644661 Z'
					fill='#FFFFFF'
					fillRule='nonzero'
				></path>
			</g>
		</svg>
	)
}
