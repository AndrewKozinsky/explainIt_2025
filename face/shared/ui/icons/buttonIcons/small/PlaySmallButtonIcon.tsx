import { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function PlaySmallButtonIcon(props: ButtonIconProps) {
	const { extraClass } = props

	return (
		<svg
			width='14px'
			height='14px'
			viewBox='0 0 14 14'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<title>playSmallButtonIcon</title>
			<defs>
				<path d='M0,0 L14,0 L14,14 L0,14 L0,0 Z' id='path-1'></path>
			</defs>
			<g stroke='none' fill='none' xlinkHref='#path-1' fill-rule='nonzero'>
				<path
					d='M3.16438526,2.30478723 C3.46776408,1.84328996 4.08781867,1.71510962 4.54931594,2.01848844 L10.66587,6.03938526 C10.7798265,6.11429791 10.8772561,6.21172756 10.9521688,6.32568406 C11.2555476,6.78718133 11.1273672,7.40723592 10.66587,7.71061474 L4.54931594,11.7315116 C4.38618229,11.8387523 4.19522592,11.8958968 4,11.8958968 C3.44771525,11.8958968 3,11.4481816 3,10.8958968 L3,2.85410318 C3,2.65887726 3.05714455,2.46792089 3.16438526,2.30478723 Z M4,2.855 L4,10.8958968 L10.116554,6.875 L4,2.855 Z'
					fill='currentColor'
				></path>
			</g>
		</svg>
	)
}
