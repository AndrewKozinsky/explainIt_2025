import BaseButton from 'ui/BaseButton/BaseButton'

type LinkButtonProps = {
	href: string
	smallText?: null | string
	text?: null | string
}

export function LinkButton(props: LinkButtonProps) {
	const { href, smallText, text } = props

	return (
		<BaseButton href={href} extraClass='book-and-prev-and-next-chapters__link'>
			<p className='book-and-prev-and-next-chapters__small-text'>{smallText}</p>
			<p className='book-and-prev-and-next-chapters__text'>{text}</p>
		</BaseButton>
	)
}
