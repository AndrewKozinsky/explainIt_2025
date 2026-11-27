import { pageUrls } from '@/shared/utils/pageUrls'
import { MainMenuLink } from '../MainMenuLink'
import './MainMenu.scss'

export function MainMenu() {
	return (
		<nav>
			<ul className='main-menu__ul'>
				<li>
					<MainMenuLink
						linkData={{ nameKey: pageUrls.aiDialogues.nameKey, path: pageUrls.aiDialogues.path }}
					/>
				</li>
				<li>
					<MainMenuLink linkData={{ nameKey: pageUrls.videos.nameKey, path: pageUrls.videos.path }} />
				</li>
				<li>
					<MainMenuLink linkData={{ nameKey: pageUrls.books.nameKey, path: pageUrls.books.path }} />
				</li>
				<li>
					<MainMenuLink linkData={{ nameKey: pageUrls.contacts.nameKey, path: pageUrls.contacts.path }} />
				</li>
			</ul>
		</nav>
	)
}
