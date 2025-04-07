'use client'

import React from 'react'
import { getAnalytics, getMetrika } from './fn/code'

// Счётчик Метрики
function Metrika() {
	const obj = {}

	return (
		<>
			<script type="text/javascript" {...getMetrika()} />
			{/*Google tag (gtag.js)*/}
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-87B3J9NFRW" />
			<script {...getAnalytics()} />
			{/* // Google tag (gtag.js)*/}
			<noscript>
				<div>
					<img
						src="https://mc.yandex.ru/watch/94712666"
						style={{ position: 'absolute', left: -9999 }}
						alt=""
					/>
				</div>
			</noscript>
		</>
	)
}

export default Metrika
