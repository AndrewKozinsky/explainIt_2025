import cn from 'classnames'
import ArticleType from '../../articleTypes/articleType'
import { typographyText } from '../../../utils/strings'
import './Header.scss'

type HeaderProps = {
	config: ArticleType.Header
}

function Header(props: HeaderProps) {
	const { config } = props

	const Component = config.tag

	return (
		<Component className={cn('art-header', 'art-header--' + config.style)}>{typographyText(config.text)}</Component>
	)
}

export default Header
