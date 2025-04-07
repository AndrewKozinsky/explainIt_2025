import React from 'react'
import s from './Peanuts.module.scss'

type PeanutsProps = {
	imageNames: string[]
}

// Группа слов в закруглённых прямоугольниках с переводами.
function Peanuts(props: PeanutsProps) {
	const { imageNames } = props

	return (
		<div className={s.wrapper}>
			{imageNames.map((imageName) => {
				return (
					<img
						src={'/articles/4_indefiniteArticle/images/' + imageName + '.svg'}
						alt="img"
					/>
				)
			})}
		</div>
	)
}

export default Peanuts
