import { Children, ReactNode } from 'react'
import cn from 'classnames'
import './Examples.scss'

type ExampleLine = { foreign: string } | { native: string }

type ExampleProps = {
	foreign?: string
	native?: string
	children?: never
}

function parseBold(text: string): ReactNode {
	const parts = text.split(/(\*\*[^*]+\*\*)/g)
	return parts.map((part, i) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return <strong key={i}>{part.slice(2, -2)}</strong>
		}
		return part
	})
}

export function Example(props: ExampleProps) {
	const { foreign, native } = props

	const lines: ExampleLine[] = []
	if (foreign !== undefined) lines.push({ foreign })
	if (native !== undefined) lines.push({ native })

	return (
		<div className='art-examples__item'>
			{lines.map((line, j) => {
				const isForeign = 'foreign' in line
				const text = 'foreign' in line ? line.foreign : line.native
				const side = isForeign ? 'foreign' : 'native'

				return (
					<p className={cn('art-examples__line', 'art-examples__line--' + side)} key={j}>
						{parseBold(text)}
					</p>
				)
			})}
		</div>
	)
}

type ExamplesProps = {
	children: ReactNode
}

function Examples(props: ExamplesProps) {
	const { children } = props

	return <div className='art-examples'>{children}</div>
}

export default Examples
