import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'

type VideosPageLayoutProps = {
	children: React.ReactNode
}

function MediaPageLayout(props: VideosPageLayoutProps) {
	const { children } = props

	return (
		<PageWrapper withTop withBottom>
			{children}
		</PageWrapper>
	)
}

export default MediaPageLayout
