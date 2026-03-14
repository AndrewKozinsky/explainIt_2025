import Link from 'next/link'

type LinkButtonProps = {
	href: string
	smallText?: null | string
	text?: null | string
}

export function LinkButton(props: LinkButtonProps) {
	const { href, smallText, text } = props

	return (
		<Link href={href} className='book-and-prev-and-next-chapters__link'>
			<p className='book-and-prev-and-next-chapters__small-text'>{smallText}</p>
			<p className='book-and-prev-and-next-chapters__text'>{text}</p>
		</Link>
	)
}
