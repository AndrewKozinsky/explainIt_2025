/** Календарные дни в часовом поясе пользователя; переход на летнее время не меняет результат. */
export function formatDialogueDate(value: string, locale: string, now = new Date()): string {
	const date = new Date(value)
	if (!Number.isFinite(date.getTime())) return ''

	const day = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
	const days = Math.max(0, Math.round((day(now) - day(date)) / 86_400_000))
	const format = new Intl.RelativeTimeFormat(locale, { numeric: days < 2 ? 'auto' : 'always' })

	if (days < 30) return format.format(-days, 'day')

	const months = Math.max(
		1,
		(now.getFullYear() - date.getFullYear()) * 12 +
			now.getMonth() -
			date.getMonth() -
			(now.getDate() < date.getDate() ? 1 : 0),
	)

	const amount = months < 12 ? months : Math.floor(months / 12)
	const unit = months < 12 ? 'month' : 'year'

	return format
		.formatToParts(-amount, unit)
		.filter((part) => !(locale.startsWith('ru') && amount === 1 && part.type === 'integer'))
		.map((part) => part.value)
		.join('')
		.trim()
}
