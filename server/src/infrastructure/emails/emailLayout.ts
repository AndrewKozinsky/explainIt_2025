import { Language } from 'utils/languages'
import { EmailContent } from 'infrastructure/emailAdapter/email-adapter.service'

/** Подсказка под кнопкой на случай, если почтовый клиент не открывает ссылку по кнопке. */
const linkFallbackHint: Record<Language, string> = {
	en: 'If the button doesn’t work, open this link in your browser:',
	es: 'Si el botón no funciona, abre este enlace en tu navegador:',
	fr: 'Si le bouton ne fonctionne pas, ouvrez ce lien dans votre navigateur :',
	de: 'Falls die Schaltfläche nicht funktioniert, öffnen Sie diesen Link im Browser:',
	it: 'Se il pulsante non funziona, apri questo link nel browser:',
	tr: 'Düğme çalışmıyorsa bu bağlantıyı tarayıcınızda açın:',
	ru: 'Если кнопка не работает, откройте эту ссылку в браузере:',
}

type EmailLayoutInput = {
	locale: Language
	subject: string
	heading: string
	// Основной текст письма над кнопкой
	intro: string
	actionLabel: string
	actionUrl: string
	// Пояснение под кнопкой: что делать, если письмо пришло по ошибке
	note: string
	siteName: string
	// Главная страница сайта на языке письма: на неё ведёт ссылка в подвале
	siteUrl: string
}

/**
 * Собирает письмо с одной кнопкой-действием в HTML- и текстовом вариантах.
 * Все подставляемые значения экранируются, поэтому в шаблоны можно передавать данные пользователя.
 */
export function renderActionEmail(input: EmailLayoutInput): EmailContent {
	const { locale, subject, heading, intro, actionLabel, actionUrl, note, siteName, siteUrl } = input
	const hint = linkFallbackHint[locale]
	// В подвале показывается адрес сайта без протокола и пути, например immersia.site
	const siteHost = new URL(siteUrl).host

	const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:24px 16px;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;">
<tr><td style="padding:32px 28px;">
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${escapeHtml(heading)}</h1>
<p style="margin:0 0 24px;font-size:16px;line-height:1.5;">${escapeHtml(intro)}</p>
<p style="margin:0 0 24px;">
<a href="${escapeHtml(actionUrl)}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:8px;font-size:16px;font-weight:bold;">${escapeHtml(actionLabel)}</a>
</p>
<p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#52525b;">${escapeHtml(hint)}</p>
<p style="margin:0 0 24px;font-size:13px;line-height:1.5;word-break:break-all;"><a href="${escapeHtml(actionUrl)}" style="color:#2563eb;">${escapeHtml(actionUrl)}</a></p>
<p style="margin:0;font-size:13px;line-height:1.5;color:#71717a;">${escapeHtml(note)}</p>
</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #e4e4e7;font-size:13px;line-height:1.5;color:#71717a;">
${escapeHtml(siteName)} — <a href="${escapeHtml(siteUrl)}" style="color:#71717a;">${escapeHtml(siteHost)}</a>
</td></tr>
</table>
</body>
</html>`

	const text = [heading, intro, `${actionLabel}: ${actionUrl}`, note, `—\n${siteName}: ${siteUrl}`].join('\n\n')

	return { subject, text, html }
}

/** Подставляет название сайта вместо `{siteName}` в тексте шаблона. */
export function insertSiteName(template: string, siteName: string) {
	return template.replaceAll('{siteName}', siteName)
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
}
