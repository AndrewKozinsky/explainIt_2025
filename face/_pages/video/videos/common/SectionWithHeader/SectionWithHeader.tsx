import './SectionWithHeader.scss'

type SectionWithHeaderProps = {
	title: string
	children: React.ReactNode
}

export function SectionWithHeader(props: SectionWithHeaderProps) {
	const { title, children } = props

	return (
		<div className='videos-section-with-header'>
			<h3 className='videos-section-with-header__title'>{title}</h3>
			{children}
		</div>
	)
}
