import type { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function MessageButtonIcon({ extraClass }: ButtonIconProps) {
	return (
		<svg
			className={extraClass}
			aria-hidden='true'
			width='19px'
			height='20px'
			viewBox='0 0 19 20'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g stroke='none' fill='none'>
				<path
					d='M16,2 C17.1045695,2 18,2.8954305 18,4 L18,13 C18,14.1045695 17.1045695,15 16,15 L9,15 L4,18.999 L4,15 L3,15 C1.8954305,15 1,14.1045695 1,13 L1,4 C1,2.8954305 1.8954305,2 3,2 L16,2 Z M16,3 L3,3 C2.44771525,3 2,3.44771525 2,4 L2,13 C2,13.5522847 2.44771525,14 3,14 L5,14 L5,16.918 L8.37540019,14.219055 L8.64928742,14 L16,14 C16.5522847,14 17,13.5522847 17,13 L17,4 C17,3.44771525 16.5522847,3 16,3 Z'
					fill='currentColor'
					fillRule='nonzero'
				/>
			</g>
		</svg>
	)
}
