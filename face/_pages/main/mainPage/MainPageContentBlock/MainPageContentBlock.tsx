import './MainPageContentBlock.scss'

type MainPageHContentBlockProps = {
	num: string
	header: string
	children: React.ReactNode
}

function MainPageHContentBlock(props: MainPageHContentBlockProps) {
	const { num, header, children } = props

	return (
		<div className='main-page-content-block'>
			<h2 className='main-page-content-block__header'>
				<span className='main-page-content-block__num'>{num}</span>
				{header}
			</h2>
			{children}
		</div>
	)
}

export default MainPageHContentBlock
