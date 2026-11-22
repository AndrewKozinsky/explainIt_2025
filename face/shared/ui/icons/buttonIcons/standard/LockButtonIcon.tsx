import type { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function LockButtonIcon({ extraClass }: ButtonIconProps) {
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
				<rect fill='currentColor' fillRule='evenodd' opacity='0.01' x='0' y='0' width='20' height='20' />
				<path
					d='M10,0.5 C12.2019153,0.5 14,2.18132597 14,4.27272727 L14,8 L16,8 C17.1045695,8 18,8.8954305 18,10 L18,17 C18,18.1045695 17.1045695,19 16,19 L4,19 C2.8954305,19 2,18.1045695 2,17 L2,10 C2,8.8954305 2.8954305,8 4,8 L6,8 L6,4.27272727 C6,2.18132597 7.79808472,0.5 10,0.5 Z M16,9 L4,9 C3.44771525,9 3,9.44771525 3,10 L3,17 C3,17.5522847 3.44771525,18 4,18 L16,18 C16.5522847,18 17,17.5522847 17,17 L17,10 C17,9.44771525 16.5522847,9 16,9 Z M10,1.5 C8.33592203,1.5 7,2.74917385 7,4.27272727 L7,8 L13,8 L13,4.27272727 C13,2.74917385 11.664078,1.5 10,1.5 Z'
					fill='currentColor'
					fillRule='nonzero'
				/>
				<path
					d='M10,11.5 C10.8284271,11.5 11.5,12.1715729 11.5,13 C11.5,13.6528467 11.0829319,14.2082819 10.500703,14.4143985 L10.5,15.5 C10.5,15.7761424 10.2761424,16 10,16 C9.72385763,16 9.5,15.7761424 9.5,15.5 L9.50029246,14.4147505 C8.91754351,14.2089149 8.5,13.6532187 8.5,13 C8.5,12.1715729 9.17157288,11.5 10,11.5 Z'
					fill='currentColor'
					fillRule='evenodd'
				/>
			</g>
		</svg>
	)
}
