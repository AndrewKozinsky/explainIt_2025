import { useTranslations } from 'next-intl'
import NoticeMessageWrapper from '../NoticeMessageWrapper/NoticeMessageWrapper'
import FootstepsIcon from './FootstepsIcon'

function UserAvoidsNpcMessage() {
	const t = useTranslations('aiDialogueMessages')

	return <NoticeMessageWrapper text={t('userLeft')} icon={<FootstepsIcon />} />
}

export default UserAvoidsNpcMessage
