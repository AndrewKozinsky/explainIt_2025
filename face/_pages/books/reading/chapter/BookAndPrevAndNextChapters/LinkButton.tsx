import cn from 'classnames'
import Link from 'next/link'

type LinkButtonProps = {
	href: string
	extraClass?: string
	children: React.ReactNode | React.ReactNode[]
}

export function LinkButton(props: LinkButtonProps) {
	const { href, extraClass, children } = props

	return (
		<Link href={href} className={cn('book-and-prev-and-next-chapters__link', extraClass)}>
			{children}
		</Link>
	)
}
