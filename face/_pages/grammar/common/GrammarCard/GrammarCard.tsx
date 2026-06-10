import React from 'react'
import BaseButton from 'ui/BaseButton/BaseButton'
import './GrammarCard.scss'

type GrammarCardProps = {
	title: string
	href: string
}

function GrammarCard(props: GrammarCardProps) {
	const { title, href } = props

	return (
		<BaseButton href={href} extraClass='grammar-card'>
			<div className='grammar-card__image' />
			<p className='grammar-card__title'>{title}</p>
		</BaseButton>
	)
}

export default GrammarCard
