// Строка с функций Метрики Яндекса
export const metrikaFunctionStr = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
	m[i].l=1*new Date();
	for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
	k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
	(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

	ym(94712666, "init", {
	clickmap:true,
	trackLinks:true,
	accurateTrackBounce:true,
	webvisor:true
})`

export function getMetrika() {
	return {
		dangerouslySetInnerHTML: {
			__html: metrikaFunctionStr,
		},
	}
}

// Строка с функций Аналитики Гугла
export const analyticsFunctionStr = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-87B3J9NFRW');`

export function getAnalytics() {
	return {
		dangerouslySetInnerHTML: {
			__html: analyticsFunctionStr,
		},
	}
}
