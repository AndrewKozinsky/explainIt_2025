import { Language, languages } from 'utils/languages'
import { buildEmailConfirmationEmail } from './emailConfirmationEmail'
import { renderActionEmail } from './emailLayout'
import { buildPasswordRecoveryEmail } from './passwordRecoveryEmail'

const allLocales = Object.keys(languages) as Language[]
const confirmationUrl = 'https://immersia.site/de/auth/email-confirmation?code=abc'
const recoveryUrl = 'https://immersia.site/de/auth/password-recovery?recoveryCode=abc'
const siteUrl = 'https://immersia.site/de'

describe('buildEmailConfirmationEmail', () => {
	it('renders the email in every interface language with the site name and the confirmation link', () => {
		const subjects = allLocales.map((locale) => {
			const email = buildEmailConfirmationEmail({ locale, siteName: 'Immersia', siteUrl, confirmationUrl })

			expect(email.subject).toContain('Immersia')
			expect(email.html).toContain(`<html lang="${locale}">`)
			expect(email.html).toContain(confirmationUrl)
			expect(email.text).toContain(confirmationUrl)
			expect(`${email.subject}${email.html}${email.text}`).not.toContain('{siteName}')

			return email.subject
		})

		expect(new Set(subjects).size).toBe(allLocales.length)
	})

	it('writes the email in the requested language', () => {
		const email = buildEmailConfirmationEmail({ locale: 'de', siteName: 'Immersia', siteUrl, confirmationUrl })

		expect(email.subject).toBe('Bestätigen Sie Ihre E-Mail-Adresse bei Immersia')
	})
})

describe('buildPasswordRecoveryEmail', () => {
	it('renders the email in every interface language with the site name and the recovery link', () => {
		const subjects = allLocales.map((locale) => {
			const email = buildPasswordRecoveryEmail({ locale, siteName: 'ExplainIt', siteUrl, recoveryUrl })

			expect(email.subject).toContain('ExplainIt')
			expect(email.html).toContain(recoveryUrl)
			expect(email.text).toContain(recoveryUrl)
			expect(`${email.subject}${email.html}${email.text}`).not.toContain('{siteName}')

			return email.subject
		})

		expect(new Set(subjects).size).toBe(allLocales.length)
	})
})

describe('renderActionEmail', () => {
	it('adds a footer with the site name and a link to the home page', () => {
		const email = renderActionEmail({
			locale: 'en',
			subject: 'Subject',
			heading: 'Heading',
			intro: 'Intro',
			actionLabel: 'Open',
			actionUrl: 'https://immersia.site/en/page',
			note: 'Note',
			siteName: 'Immersia',
			siteUrl: 'https://immersia.site/en',
		})

		expect(email.html).toContain(
			'Immersia — <a href="https://immersia.site/en" style="color:#71717a;">immersia.site</a>',
		)
		expect(email.text).toContain('Immersia: https://immersia.site/en')
	})

	it('escapes inserted values in the HTML version and keeps them as is in the text version', () => {
		const email = renderActionEmail({
			locale: 'en',
			subject: 'Hi <b>',
			heading: 'Tom & "Jerry"',
			intro: '<script>alert(1)</script>',
			actionLabel: 'Open',
			actionUrl: 'https://immersia.site/en/page?first=1&second=2',
			note: 'Note',
			siteName: 'Immersia',
			siteUrl: 'https://immersia.site/en',
		})

		expect(email.html).not.toContain('<script>')
		expect(email.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
		expect(email.html).toContain('Tom &amp; &quot;Jerry&quot;')
		expect(email.html).toContain('href="https://immersia.site/en/page?first=1&amp;second=2"')
		expect(email.text).toContain('<script>alert(1)</script>')
		expect(email.text).toContain('https://immersia.site/en/page?first=1&second=2')
	})
})
