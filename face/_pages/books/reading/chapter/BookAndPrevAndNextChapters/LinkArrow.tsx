type LinkArrowProps = {
	direction: 'left' | 'right'
}

export default function LinkArrow(props: LinkArrowProps) {
	const { direction } = props

	if (direction === 'left') {
		return (
			<div className='book-and-prev-and-next-chapters__arrow-container'>
				<img src='/readingPage/LeftArrow.svg' alt='arrow sign' />
				<div className='book-and-prev-and-next-chapters__arrow-hr' />
			</div>
		)
	}

	return (
		<div className='book-and-prev-and-next-chapters__arrow-container'>
			<div className='book-and-prev-and-next-chapters__arrow-hr' />
			<img src='/readingPage/RightArrow.svg' alt='arrow sign' />
		</div>
	)
}
