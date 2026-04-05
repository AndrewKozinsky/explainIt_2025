import cn from 'classnames'
import { LinkLogo } from 'ui/logo/LinkLogo/LinkLogo'
import AuthButtons from 'ui/pageRelated/pageTopBar/AuthButtons/AuthButtons'
import { MainMenu } from '../../MainMenu/MainMenu'
import './Bar.scss'

function Bar() {
	return (
		<div className={cn('page-bar')}>
			<div className='page-bar__left'>
				<LinkLogo />
				<MainMenu />
			</div>
			<AuthButtons />
		</div>
	)
}

export default Bar
