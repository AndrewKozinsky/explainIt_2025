import NoticeMessageWrapper from '../NoticeMessageWrapper/NoticeMessageWrapper'
import FootstepsIcon from './FootstepsIcon'

function UserAvoidsNpcMessage() {
	return <NoticeMessageWrapper text='Вы ушли от разговора.' icon={<FootstepsIcon />} />
}

export default UserAvoidsNpcMessage
