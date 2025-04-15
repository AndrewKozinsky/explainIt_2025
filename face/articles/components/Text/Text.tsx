import cn from 'classnames'
import ArticleType from '../../articleTypes/articleType'
import { typographyText } from '../../../utils/strings'
import './Text.scss'

type TextProps = {
	config: ArticleType.Text
}

/** Текст статьи */
function Text(props: TextProps) {
	const { config } = props

	if (!config.color && !config.color && !config.weight) {
		return config.text
	}

	const classes = [
		'art-text',
		config.color && 'art-text--color-' + config.color,
		config.weight && 'art-text--weight-' + config.weight,
	]

	return <span className={cn(classes)}>{typographyText(config.text)}</span>
}

export default Text
