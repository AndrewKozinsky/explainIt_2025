import React from 'react'
import { pageUrls } from '@/сonsts/pageUrls'
import { MainMenuLink } from '../MainMenuLink'
import './MainMenu.scss'

export function MainMenu() {
	return (
		<nav data-testid='main-menu'>
			<ul className='main-menu__ul'>
				<li>
					<MainMenuLink linkData={pageUrls.course} />
				</li>
				{/*<li>
					<MainMenuLink linkData={pageUrls.howToSayItInRussian} />
				</li>*/}
				<li>
					<MainMenuLink linkData={pageUrls.llm} />
				</li>
				<li>
					<MainMenuLink linkData={pageUrls.contacts} />
				</li>
			</ul>
		</nav>
	)
}
