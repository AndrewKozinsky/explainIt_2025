import { ReactNode } from 'react'
import cn from 'classnames'
import { useTranslations } from 'next-intl'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import { pageUrls } from '@/shared/utils/pageUrls'
import LogoSign from '../../logo/LogoSign/LogoSign'
import './Pagination.scss'

/** Элемент хлебных крошек. name — уже готовый текст: название страницы переводит вызывающий код (t(pageUrls.books.nameKey)) */
export type BreadCrumbsItem = {
	name: string
	path: string
}

type PaginationProps = {
	items?: BreadCrumbsItem[]
}

/** Хлебные крошки */
export function BreadCrumbs(props: PaginationProps) {
	const { items = [] } = props

	const itemsComps = [<PaginationRootItem withText={!items.length} key='/' />]

	items.forEach((item) => {
		itemsComps.push(<PaginationItem item={item} key={item.path} />)
	})

	return <nav className='pagination'>{itemsComps}</nav>
}

type PaginationRootItemProps = {
	withText?: boolean
}

/** Корневой элемент хлебных крошек */
function PaginationRootItem(props: PaginationRootItemProps) {
	const { withText = false } = props
	const t = useTranslations('pageUrls')

	const logo = <LogoSign extraClass='pagination-icon' />

	return withText ? (
		<PaginationItem item={{ path: pageUrls.main.path, name: t(pageUrls.main.nameKey) }} icon={logo} />
	) : (
		<PaginationItem item={{ path: pageUrls.main.path, name: '' }} icon={logo} />
	)
}

type PaginationItemProps = {
	item: BreadCrumbsItem
	icon?: ReactNode
}

/** Элемент хлебных крошек */
function PaginationItem(props: PaginationItemProps) {
	const { item, icon = null } = props

	const textElem = (
		<span className={cn('pagination-item-text', !!icon && 'pagination-item-text--with-icon')}>{item.name}</span>
	)

	return (
		<BaseButton theme='outline' href={item.path} extraClass='pagination-item'>
			{icon}
			{item.name && textElem}
		</BaseButton>
	)
}
