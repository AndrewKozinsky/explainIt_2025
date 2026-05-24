'use client'

import cn from 'classnames'
import BaseButton from '@/ui/BaseButton/BaseButton'
import { routesUtils } from '@/utils/routes'
import './ExpressionLink.scss'

type BookLinkProps = {
	name?: null | string
	subName?: null | string
	href: string
}

function ExpressionLink(props: BookLinkProps) {
	const { name, subName, href } = props
	const isCurrentPage = routesUtils.useIsCurrentPage(href)

	return (
		<BaseButton
			theme='plain'
			extraClass={cn('expression-link', isCurrentPage && 'expression-link--current')}
			href={href}
			current={isCurrentPage}
		>
			{subName && <p className='expression-link__author'>{subName}</p>}
			<p className='expression-link__name'>{name}</p>
		</BaseButton>
	)
}

export default ExpressionLink
