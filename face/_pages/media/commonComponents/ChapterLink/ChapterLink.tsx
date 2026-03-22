import cn from 'classnames'
import Link from 'next/link'
import Paragraph from '@/ui/Paragraph/Paragraph'
import { routesUtils } from '@/utils/routes'
import './ChapterLink.scss'

type BookLinkProps = {
	name: string
	subName?: null | string
	href: string
}

function ChapterLink(props: BookLinkProps) {
	const { name, subName, href } = props
	const isCurrentPage = routesUtils.useIsCurrentPage(href)

	return (
		<Link href={href} className={cn('chapter-link', isCurrentPage && 'chapter-link--current')}>
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
