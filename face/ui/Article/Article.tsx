import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponentsRouter } from '@/ui/articleBuilder/mdxComponentsRouter'
import './Article.scss'

type ArticleProps = {
	content: string
}

export default function Article({ content }: ArticleProps) {
	return (
		<article className='article'>
			<MDXRemote source={content} components={mdxComponentsRouter} />
		</article>
	)
}
