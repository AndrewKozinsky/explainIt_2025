'use client'

import { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { MDXRemote } from 'next-mdx-remote'
import { mdxComponentsRouter } from '@/ui/articleBuilder/mdxComponentsRouter'
import Modal from '@/ui/Modal/Modal'
import './GrammarArticleModal.scss'

const GET_GRAMMAR_ARTICLE = gql`
	query GrammarArticle_get($input: GetGrammarArticleInput!) {
		grammar_article_get(input: $input) {
			title
			content
			compiledSource
		}
	}
`

type GrammarArticleModalProps = {
	isOpen: boolean
	onClose: () => void
	title: string
	sourceLanguage: string
	targetLanguage: string
	category: string
	slug: string
}

export default function GrammarArticleModal(props: GrammarArticleModalProps) {
	const { isOpen, onClose, title, sourceLanguage, targetLanguage, category, slug } = props
	const [compiledSource, setCompiledSource] = useState<string | null>(null)

	const [fetchArticle, { loading }] = useLazyQuery(GET_GRAMMAR_ARTICLE, {
		onCompleted: (data) => {
			setCompiledSource(data.grammar_article_get.compiledSource || null)
		},
		onError: () => {
			setCompiledSource(null)
		},
	})

	useEffect(() => {
		if (!isOpen) return

		setCompiledSource(null)
		fetchArticle({
			variables: {
				input: { sourceLanguage, targetLanguage, category, slug },
			},
		})
	}, [isOpen, sourceLanguage, targetLanguage, category, slug, fetchArticle])

	return (
		<Modal header={title} isOpen={isOpen} close={onClose} extraClass='grammar-article-modal__body'>
			{loading && <p>Loading...</p>}
			{!loading && compiledSource && (
				<article className='article'>
					<MDXRemote
						compiledSource={compiledSource}
						components={mdxComponentsRouter}
						frontmatter={{}}
						scope={{}}
					/>
				</article>
			)}
			{!loading && !compiledSource && <p>Article not found</p>}
		</Modal>
	)
}
