import { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function TextSmallButtonIcon(props: ButtonIconProps) {
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
			<g stroke='none' fill='none' xlinkHref='#path-1' fillRule='evenodd'>
				<path fill='currentColor' d='M1,2 H13 V3 H1 Z'></path>
				<path fill='currentColor' d='M1,5 H13 V6 H1 Z'></path>
				<path fill='currentColor' d='M1,8 H13 V9 H1 Z'></path>
				<path fill='currentColor' d='M1,11 H9 V12 H1 Z'></path>
			</g>
		</svg>
	)
}
