import Link from 'next/link'
import Paragraph from '@/ui/Paragraph/Paragraph'
import './ChapterLink.scss'

type BookLinkProps = {
	name: string
	subName?: null | string
	href: string
}

function ChapterLink(props: BookLinkProps) {
	const { name, subName, href } = props

	return (
		<Link href={href} className='chapter-link'>
			{subName && (
				<Paragraph fontSize='14' extraClass='chapter-link__author'>
					{subName}
				</Paragraph>
			)}
			<p className='chapter-link__name'>{name}</p>
		</Link>
	)
}

export default ChapterLink
