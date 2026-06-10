import cn from 'classnames'
import { LinkLogo } from 'ui/logo/LinkLogo/LinkLogo'
import AuthButtons from 'ui/pageRelated/pageTopBar/AuthButtons/AuthButtons'
import { LanguageSwitcher } from 'ui/pageRelated/pageTopBar/LanguageSwitcher/LanguageSwitcher'
import { MainMenu } from '../../MainMenu/MainMenu'
import './Bar.scss'

function Bar() {
	return (
		<div className={cn('page-bar')}>
			<div className='page-bar__left'>
				<LinkLogo />
				<MainMenu />
			</div>
			<div className='page-bar__right'>
				<LanguageSwitcher />
				<AuthButtons />
			</div>
		</div>
	)
}

export default Bar
