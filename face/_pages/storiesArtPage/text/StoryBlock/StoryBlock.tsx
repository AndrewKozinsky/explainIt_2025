// 'use client'

// import cn from 'classnames'
// import React from 'react'
// import { useStoryStore } from '../../store/store'
// import { StoryConfigT } from '../../storyTypes'
// import { useGetOnWordClick, useIsWordSelected } from './fn/selectWord'
// import './StoryBlock.scss'

/** Страница вводной глав курса */
/*function StoryBlock() {
	const storyConfig = useStoryStore().storyConfig

	return (
		<div className="story-block">
			{storyConfig.paragraphs.map((paragraph) => {
				return <Paragraph paragraph={paragraph}></Paragraph>
			})}
		</div>
	)
}*/

// export default StoryBlock

/*type ParagraphProps = {
	paragraph: StoryConfigT.Paragraph
}*/

/*function Paragraph(props: ParagraphProps) {
	const { paragraph } = props

	return (
		<p>
			{paragraph.sentences.map((sentence) => {
				return <Sentence sentence={sentence} />
			})}
		</p>
	)
}*/

/*type SentenceProps = {
	sentence: StoryConfigT.Sentence
}*/
/*function Sentence(props: SentenceProps) {
	const { sentence } = props

	return sentence.sentenceParts.map((sentencePart) => {
		if (sentencePart.type === 'word') {
			return <Word sentence={sentence} word={sentencePart} />
		} else if (sentencePart.type === 'punctuation') {
			return <Punctuation punctuation={sentencePart} />
		}
	})
}*/

/*type WordProps = {
	sentence: StoryConfigT.Sentence
	word: StoryConfigT.Word
}*/
/*function Word(props: WordProps) {
	const { sentence, word } = props

	const onWordClick = useGetOnWordClick(sentence.id, word.id)
	const isWordSelected = useIsWordSelected(sentence.id, word.id)

	return (
		<span
			className={cn('story-block__word', isWordSelected && 'story-block__word--selected')}
			onClick={onWordClick}
		>
			{word.word.engWord}
		</span>
	)
}*/

/*type PunctuationProps = {
	punctuation: StoryConfigT.Punctuation
}*/
/*function Punctuation(props: PunctuationProps) {
	const { punctuation } = props

	return <span>{punctuation.text}</span>
}*/
