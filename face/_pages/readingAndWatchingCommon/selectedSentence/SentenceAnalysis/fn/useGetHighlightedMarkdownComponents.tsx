import React from 'react'

export function useGetHighlightedMarkdownComponents(selectedWord: null | string) {
	const selectedWordLower = React.useMemo(
		function () {
			return selectedWord?.toLowerCase() ?? null
		},
		[selectedWord],
	)

	return React.useMemo(
		function () {
			if (!selectedWordLower) return undefined

			function highlightTextNode(text: string): React.ReactNode {
				const segmenter = new Intl.Segmenter('en', { granularity: 'word' })
				const segments = [...segmenter.segment(text)]

				return segments.map((segment, i) => {
					const isMatch = segment.isWordLike && segment.segment.toLowerCase() === selectedWordLower
					if (!isMatch) return segment.segment

					return (
						<span key={i} className='markdown__flashed-word'>
							<span>{segment.segment}</span>
							<span />
						</span>
					)
				})
			}

			function highlightNode(node: React.ReactNode): React.ReactNode {
				if (typeof node === 'string') return highlightTextNode(node)
				if (!React.isValidElement(node)) return node

				const props: any = node.props
				if (!props || props.children == null) return node

				const nextChildren = React.Children.map(props.children, highlightNode)
				return React.cloneElement(node, undefined, nextChildren)
			}

			function HighlightBlock(props: { children?: React.ReactNode }) {
				return <>{React.Children.map(props.children, highlightNode)}</>
			}

			return {
				p: ({ children }: { children?: React.ReactNode }) => <p>{HighlightBlock({ children })}</p>,
				li: ({ children }: { children?: React.ReactNode }) => <li>{HighlightBlock({ children })}</li>,
				h1: ({ children }: { children?: React.ReactNode }) => <h1>{HighlightBlock({ children })}</h1>,
				h2: ({ children }: { children?: React.ReactNode }) => <h2>{HighlightBlock({ children })}</h2>,
				h3: ({ children }: { children?: React.ReactNode }) => <h3>{HighlightBlock({ children })}</h3>,
				h4: ({ children }: { children?: React.ReactNode }) => <h4>{HighlightBlock({ children })}</h4>,
				h5: ({ children }: { children?: React.ReactNode }) => <h5>{HighlightBlock({ children })}</h5>,
				h6: ({ children }: { children?: React.ReactNode }) => <h6>{HighlightBlock({ children })}</h6>,
			}
		},
		[selectedWordLower],
	)
}
