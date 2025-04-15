import React, { ReactNode } from 'react'
import cn from 'classnames'
import './ArtImage.scss'

type ArtImageProps = {
	config: {
		src?: string
		alt?: string
		extraClass?: string
		children?: ReactNode
	}
}

/**
 * Обёртка для компонентов, похожих на изображения.
 * Если передан src, то создаётся изображение.
 * Если есть вложенные элементы, то вкладываются в обёртку.
 */
function ArtImage(props: ArtImageProps) {
	const { src, alt, extraClass, children } = props.config

	let content: null | ReactNode = null

	if (src) {
		content = <img src={src} alt={alt} />
	} else if (children) {
		content = children
	}

	return <div className={cn('art-image', extraClass)}>{content}</div>
}

export default ArtImage
