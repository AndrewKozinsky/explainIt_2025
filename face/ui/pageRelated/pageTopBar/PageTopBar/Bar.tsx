import cn from 'classnames'
import { LinkLogo } from 'ui/logo/LinkLogo/LinkLogo'
import { MainMenu } from '../../MainMenu/MainMenu'
import PageTopBarUserButtons from '../PageTopBarUserButtons/PageTopBarUserButtons'
import './Bar.scss'

function Bar() {
	return (
		<div className={cn('page-bar')}>
			<div className='page-bar__left'>
				<LinkLogo />
				<MainMenu />
			</div>
			<PageTopBarUserButtons />
		</div>
	)
}

export default Bar
