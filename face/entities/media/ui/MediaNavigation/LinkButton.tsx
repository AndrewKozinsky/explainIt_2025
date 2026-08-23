// import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'

/*type LinkButtonProps = {
	href: string
	smallText?: null | string
	text?: null | string
	coverUrl?: null | string
}*/

/*export function LinkButton(props: LinkButtonProps) {
	const { href, smallText, coverUrl } = props
	const text = props.text ?? smallText

	const withCover = !!coverUrl

	return (
		<BaseButton
			href={href}
			extraClass={'reading-navigation__link' + (withCover ? ' reading-navigation__link--with-cover' : '')}
			style={withCover ? ({ '--cover-url': `url(${coverUrl})` } as React.CSSProperties) : undefined}
		>
			{smallText && <p className='reading-navigation__small-text'>{smallText}</p>}
			{text && <p className='reading-navigation__text'>{text}</p>}
		</BaseButton>
	)
}*/
