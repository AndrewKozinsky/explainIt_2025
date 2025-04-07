// 'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import LogoSign from '../../logo/LogoSign/LogoSign'
import cn from 'classnames'
import './Pagination.scss'

type PagItemType = {
	name: string
	url: string
}

type PaginationProps = {
	items?: PagItemType[]
}

/** Хлебные крошки */
export function BreadCrumbs(props: PaginationProps) {
	const { items = [] } = props

	const itemsComps = [<PaginationRootItem withText={!items.length} key="/" />]

	items.forEach((item) => {
		itemsComps.push(<PaginationItem item={item} key={item.url} />)
	})

	return <nav className="pagination">{itemsComps}</nav>
}

type PaginationRootItemProps = {
	withText?: boolean
}

/** Корневой элемент хлебных крошек */
function PaginationRootItem(props: PaginationRootItemProps) {
	const { withText = false } = props

	const logo = <LogoSign extraClass="pagination-icon" />

	return withText ? (
		<PaginationItem item={{ url: '/', name: 'Главная' }} icon={logo} />
	) : (
		<PaginationItem item={{ url: '/', name: '' }} icon={logo} />
	)
}

type PaginationItemProps = {
	item: PagItemType
	icon?: ReactNode
}

/** Элемент хлебных крошек */
function PaginationItem(props: PaginationItemProps) {
	const { item, icon = null } = props

	const textElem = (
		<span className={cn('pagination-item-text', !!icon && 'pagination-item-text--with-icon')}>
			{item.name}
		</span>
	)

	return (
		<Link href={item.url} className="pagination-item">
			{icon}
			{item.name && textElem}
		</Link>
	)
}
