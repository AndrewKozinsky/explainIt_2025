import Header from './Header/Header'
import Paragraph from './Paragraph/Paragraph'
import List from './List/List'
import type { MDXComponents } from 'mdx/types'

export const mdxComponentsRouter: MDXComponents = {
	h2: ({ children }) => <Header tag='h2'>{children}</Header>,
	h3: ({ children }) => <Header tag='h3'>{children}</Header>,
	h4: ({ children }) => <Header tag='h4'>{children}</Header>,
	p: ({ children }) => <Paragraph>{children}</Paragraph>,
	ul: ({ children }) => <List listType='dots'>{children}</List>,
	ol: ({ children }) => <List listType='numbers'>{children}</List>,
	li: ({ children }) => (
		<li>
			<Paragraph>{children}</Paragraph>
		</li>
	),
}
