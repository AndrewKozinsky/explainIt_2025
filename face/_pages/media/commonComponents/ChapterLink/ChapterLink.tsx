import cn from 'classnames'
import BaseButton from '@/ui/BaseButton/BaseButton'
import { routesUtils } from '@/utils/routes'
import './ChapterLink.scss'

type BookLinkProps = {
	name?: null | string
	subName?: null | string
	href: string
}

function ChapterLink(props: BookLinkProps) {
	const { name, subName, href } = props
	const isCurrentPage = routesUtils.useIsCurrentPage(href)

	return (
		<BaseButton
			theme='plain'
			extraClass={cn('chapter-link', isCurrentPage && 'chapter-link--current')}
			href={href}
			current={isCurrentPage}
		>
			{subName && <p className='chapter-link__author'>{subName}</p>}
			<p className='chapter-link__name'>{name}</p>
		</BaseButton>
	)
}

export default ChapterLink
