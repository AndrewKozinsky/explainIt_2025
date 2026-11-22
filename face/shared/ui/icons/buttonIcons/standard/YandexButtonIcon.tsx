import type { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function YandexButtonIcon({ extraClass }: ButtonIconProps) {
	return (
		<svg
			className={extraClass}
			aria-hidden='true'
			width='20px'
			height='20px'
			viewBox='0 0 20 20'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g stroke='none' fill='none'>
				<rect fill='#D8D8D8' fillRule='evenodd' opacity='0.100000001' x='0' y='0' width='20' height='20' />
				<path
					d='M1,10 C1,5.0293 5.0284,1 10,1 C14.9698,1 19,5.0293 19,10 C19,14.9707 14.9698,19 10,19 C5.0284,19 1,14.9707 1,10 Z'
					fill='#FC3F1D'
					fillRule='nonzero'
				/>
				<path
					d='M11.152,6.0994 L10.3204,6.0994 C8.7958,6.0994 7.9939,6.8716 7.9939,8.0101 C7.9939,9.2971 8.5483,9.9001 9.6868,10.6732 L10.6273,11.3068 L7.9246,15.3451 L5.905,15.3451 L8.3305,11.7325 C6.9355,10.7326 6.1525,9.7615 6.1525,8.119 C6.1525,6.0598 7.588,4.654 10.3105,4.654 L13.0132,4.654 L13.0132,15.3352 L11.152,15.3352 L11.152,6.0994 Z'
					fill='#FFFFFF'
					fillRule='nonzero'
				/>
			</g>
		</svg>
	)
}
