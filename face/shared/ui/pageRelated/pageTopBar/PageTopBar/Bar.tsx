import cn from 'classnames'
import { LinkLogo } from '@/shared/ui/logo/LinkLogo/LinkLogo'
import { MainMenu } from '@/shared/ui/pageRelated/MainMenu/MainMenu'
import AuthButtons from '../AuthButtons/AuthButtons'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
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
