import { useMemo } from 'react'
import './SegmentedText.scss'

type WordSegment = {
	text: string
	isWord: boolean
}

type SegmentedTextProps = {
	text: string
	onWordClick?: (word: string) => void
}

// Один сегментатор на модуль — создавать его на каждый рендер не нужно.
const wordSegmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

/**
 * Разбивает текст на слова и делает каждое слово кликабельным.
 *
 * Знаки препинания и пробелы остаются обычным текстом (не оборачиваются в кнопку).
 * Слово определяется через {@link Intl.Segmenter} (признак `isWordLike`).
 */
function SegmentedText({ text, onWordClick }: SegmentedTextProps) {
	const segments = useMemo(() => splitIntoWordSegments(text), [text])

	return (
		<>
			{segments.map((segment, index) => {
				if (segment.isWord && onWordClick) {
					return (
						<button
							key={index}
							type='button'
							className='segmented-text__word'
							onClick={() => onWordClick(segment.text)}
						>
							{segment.text}
						</button>
					)
				}

				return <span key={index}>{segment.text}</span>
			})}
		</>
	)
}

function splitIntoWordSegments(text: string): WordSegment[] {
	return Array.from(wordSegmenter.segment(text), (segment) => ({
		text: segment.segment,
		isWord: segment.isWordLike ?? false,
	}))
}

export default SegmentedText
