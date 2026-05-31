import BaseButton from 'ui/BaseButton/BaseButton'

type LinkButtonProps = {
	href: string
	smallText?: null | string
	text?: null | string
	coverUrl?: null | string
}

export function LinkButton(props: LinkButtonProps) {
	const { href, smallText, text, coverUrl } = props

	const withCover = !!coverUrl

	return (
		<BaseButton
			href={href}
			extraClass={
				'reading-navigation__link-item reading-navigation__link' +
				(withCover ? ' reading-navigation__link--with-cover' : '')
			}
			style={withCover ? ({ '--cover-url': `url(${coverUrl})` } as React.CSSProperties) : undefined}
		>
			<p className='reading-navigation__small-text'>{smallText}</p>
			<p className='reading-navigation__text'>{text}</p>
		</BaseButton>
	)
}
