import Script from 'next/script'
import { gtmNoscriptSrc, gtmScriptStr } from './fn/gtmCode'

function GoogleTagManager() {
	return (
		<>
			<Script id='gtm' strategy='afterInteractive'>
				{gtmScriptStr}
			</Script>
			<noscript>
				<iframe src={gtmNoscriptSrc} height='0' width='0' style={{ display: 'none', visibility: 'hidden' }} />
			</noscript>
		</>
	)
}

export default GoogleTagManager
