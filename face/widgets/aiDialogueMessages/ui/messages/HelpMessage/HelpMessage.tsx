import NoticeMessageWrapper from '../NoticeMessageWrapper/NoticeMessageWrapper'
import HelpBulbIcon from './HelpBulbIcon'

type HelpMessageProps = {
	content?: string
}

function HelpMessage({ content = '' }: HelpMessageProps) {
	return <NoticeMessageWrapper text={content} icon={<HelpBulbIcon />} />
}

export default HelpMessage
