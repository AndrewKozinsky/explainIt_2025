import { LinkButton } from './LinkButton'

type BookLinkProps = {
	href: string
	text?: null | string
	smallText?: null | string
	coverUrl?: null | string
}

type ChapterLinkProps = {
	href: string
	text?: null | string
	smallText?: null | string
}

export function BookLink(props: BookLinkProps) {
	const { href, smallText, text, coverUrl } = props

	return <LinkButton href={href} smallText={smallText} text={text} coverUrl={coverUrl} />
}

export function PrevChapterLink({ config }: { config?: ChapterLinkProps }) {
	if (!config) {
		return <div />
	}

	const { href, smallText, text } = config

	return <LinkButton href={href} smallText={smallText} text={text} />
}

export function NextChapterLink({ config }: { config?: ChapterLinkProps }) {
	if (!config) {
		return <div />
	}

	const { href, smallText, text } = config

	return <LinkButton href={href} smallText={smallText} text={text} />
}
