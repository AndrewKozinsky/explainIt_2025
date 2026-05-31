import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'

type VideosPageLayoutProps = {
	children: React.ReactNode
}

function MediaPageLayout(props: VideosPageLayoutProps) {
	const { children } = props

	return (
		<PageWrapper top bottom>
			{children}
		</PageWrapper>
	)
}

export default MediaPageLayout
