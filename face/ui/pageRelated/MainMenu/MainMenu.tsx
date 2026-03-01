import { pageUrls } from '@/сonsts/pageUrls'
import { MainMenuLink } from '../MainMenuLink'
import './MainMenu.scss'

export function MainMenu() {
	return (
		<nav data-testid='main-menu'>
			<ul className='main-menu__ul'>
				{/*<li>
					<MainMenuLink linkData={pageUrls.course} />
				</li>*/}
				<li>
					<MainMenuLink linkData={{ name: pageUrls.books.name, path: pageUrls.books.path }} />
				</li>
				<li>
					<MainMenuLink linkData={{ name: pageUrls.videos.name, path: pageUrls.videos.path }} />
				</li>
				<li>
					<MainMenuLink linkData={{ name: pageUrls.tariffs.name, path: pageUrls.tariffs.path }} />
				</li>
				{/*<li>
					<MainMenuLink linkData={{ name: pageUrls.help.name, path: pageUrls.help.path }} />
				</li>*/}
				<li>
					<MainMenuLink linkData={pageUrls.contacts} />
				</li>
			</ul>
		</nav>
	)
}
