import cn from 'classnames'
import ArticleType from '../../articleTypes/articleType'
import ArrowCircle from '../ArrowCircle/ArrowCircle'
import Text from '../Text/Text'
import './Paragraph.scss'

type ParagraphProps = {
	config: ArticleType.Paragraph
}

/** Компонент абзаца в статье */
function Paragraph(props: ParagraphProps) {
	const { config } = props

	const classes = [
		'art-paragraph',
		config.textSize && 'art-paragraph--size-' + config.textSize,
		// Такого свойства нет.
		// config.textColor && 'art-paragraph--color-' + config.textColor,
		config.offset && 'art-paragraph--offset',
	]

	return (
		<p className={cn(classes)}>
			<ParagraphChildren textConfigs={config.children} />
		</p>
	)
}

export default Paragraph

type ParagraphChildrenProps = {
	textConfigs: ArticleType.Paragraph['children']
}

/** Дети компонента абзаца в статье */
function ParagraphChildren(props: ParagraphChildrenProps) {
	const { textConfigs } = props

	return (
		<>
			{textConfigs.map((config, i) => {
				if (config.type === 'text') {
					return <Text config={config} key={i} />
				} else if (config.type === 'arrow') {
					return <ArrowCircle key={i} />
				} else {
					return null
				}
			})}
		</>
	)
}
