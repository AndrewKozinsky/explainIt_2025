import React from 'react'
import Link from 'next/link'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import CustomMaterialCovers from '_pages/main/CustomMaterials/CustomMaterialCovers'
import { pageUrls } from 'сonsts/pageUrls'
import './CustomMaterials.scss'

function CustomMaterials() {
	return (
		<div className='custom-materials'>
			<CustomMaterialCovers />

			<div className='custom-materials__top'>
				<div className='custom-materials__content'>
					<p className='custom-materials__top-header'>
						Хотите читать Гарри Поттера или&nbsp;смотреть Властелина колец в&nbsp;оригинале?
					</p>
					<p className='custom-materials__sub-top-header'>
						Загрузите книгу или&nbsp;фильм и&nbsp;начните понимать с&nbsp;первого предложения
					</p>
				</div>
			</div>

			<div className='custom-materials__bottom'>
				<div className='custom-materials__add-btn'>
					<Link className='custom-materials__add-btn-hit-area' href={pageUrls.books.path}>
						<button className='custom-materials__add-btn-item'>
							<img src={publicFolderFilesUrls.mainPage.bookIcon} alt='' />
						</button>
					</Link>
					<Link className='custom-materials__add-btn-hit-area' href={pageUrls.videos.path}>
						<button className='custom-materials__add-btn-item'>
							<img src={publicFolderFilesUrls.mainPage.videoIcon} alt='' />
						</button>
					</Link>
					<div className='custom-materials__add-btn-plus' />
				</div>
			</div>
		</div>
	)
}

export default CustomMaterials
