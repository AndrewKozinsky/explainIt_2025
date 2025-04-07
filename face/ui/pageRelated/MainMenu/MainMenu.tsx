import React from 'react'
import { PageUrls } from '../../../сonsts/pageUrls'
import {MainMenuLink} from '../MainMenuLink'
import './MainMenu.scss'

export function MainMenu() {
	return (
		<nav data-testid="main-menu">
			<ul className="main-menu__ul">
				<li>
					<MainMenuLink linkData={PageUrls.course} />
				</li>
				<li>
					<MainMenuLink linkData={PageUrls.contacts} />
				</li>
			</ul>
		</nav>
	)
}

