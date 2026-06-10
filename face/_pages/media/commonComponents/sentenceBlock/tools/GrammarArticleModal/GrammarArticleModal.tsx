'use client'

import { useEffect, useState } from 'react'
import { useGrammarArticle_GetLazyQuery } from 'graphql'
import { MDXRemote } from 'next-mdx-remote'
import { mdxComponentsRouter } from '@/ui/articleBuilder/mdxComponentsRouter'
import Modal from '@/ui/Modal/Modal'
import './GrammarArticleModal.scss'

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

	const [fetchArticle, { loading }] = useGrammarArticle_GetLazyQuery({
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
