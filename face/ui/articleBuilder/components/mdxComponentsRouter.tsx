import Header from './Header/Header'
import Paragraph from './Paragraph/Paragraph'
import type { MDXComponents } from 'mdx/types'

export const mdxComponentsRouter: MDXComponents = {
	h2: ({ children }) => <Header tag='h2'>{children}</Header>,
	h3: ({ children }) => <Header tag='h3'>{children}</Header>,
	h4: ({ children }) => <Header tag='h4'>{children}</Header>,
	p: ({ children }) => <Paragraph>{children}</Paragraph>,
}
