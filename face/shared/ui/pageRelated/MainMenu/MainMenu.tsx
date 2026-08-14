import { pageUrls } from '@/shared/utils/pageUrls'
import { MainMenuLink } from '../MainMenuLink'
import './MainMenu.scss'

export function MainMenu() {
	return (
		<nav>
			<ul className='main-menu__ul'>
				<li>
					<MainMenuLink linkData={{ name: pageUrls.videos.name, path: pageUrls.videos.path }} />
				</li>
				<li>
					<MainMenuLink linkData={{ name: pageUrls.books.name, path: pageUrls.books.path }} />
				</li>
				<li>
					<MainMenuLink linkData={{ name: pageUrls.dictionary.name, path: pageUrls.dictionary.path }} />
				</li>
				<li>
					<MainMenuLink linkData={pageUrls.contacts} />
				</li>
			</ul>
		</nav>
	)
}
