import React from 'react'

type TextProps = {
	children: string
}

export function SmallGrayText(props: TextProps) {
	const { children } = props

	return <p className='book-and-prev-and-next-chapters__small-text'>{children}</p>
}

export function RegularText(props: TextProps) {
	const { children } = props

	return <p className='book-and-prev-and-next-chapters__text'>{children}</p>
}
