import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'

export default function ExpressionsLayout({ children }: { children: React.ReactNode }) {
	return (
		<PageWrapper top bottom>
			{children}
		</PageWrapper>
	)
}
