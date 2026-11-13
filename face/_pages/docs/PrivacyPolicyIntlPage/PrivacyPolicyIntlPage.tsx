import React from 'react'
import mainConfig from '@/shared/consts/mainConfig'
import styles from '../doc.module.scss'

/**
 * Политика конфиденциальности международной версии сайта (immersia.site).
 * Написана под GDPR, только на английском — для всех языков интерфейса.
 * Российская версия для explainit.ru — PrivacyPolicyPage.
 */
function PrivacyPolicyIntlPage() {
	const lastUpdated = '13 November 2026'
	const supportEmail = mainConfig.supportEmail

	return (
		<div className={styles['doc-page']}>
			<h1>Privacy Policy</h1>

			<p className={styles['last-updated']}>Last updated: {lastUpdated}</p>

			<h2>1. Who we are</h2>

			<p>
				This Privacy Policy explains how personal data is processed when you use Immersia at{' '}
				<a href='https://immersia.site'>https://immersia.site</a> (the <em>Service</em>).
			</p>
			<p>
				The controller of your personal data is <strong>Andrew Kozinsky</strong>, the operator of Immersia (
				<em>we</em>, <em>us</em>). For any question about this Policy or your data, write to{' '}
				<a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
			</p>

			<h2>2. Data we collect</h2>

			<p>
				<strong>Account data.</strong> If you sign up with email: your email address and password (stored only
				as a hash). If you sign in with Google, GitHub or Yandex: your email address and name received from that
				service.
			</p>
			<p>
				<strong>Profile data.</strong> Your gender, the avatar you choose and, if you upload one, your photo.
				The photo is used to draw you in scene illustrations of your conversations.
			</p>
			<p>
				<strong>Content you create.</strong> Your replies and actions in AI conversations, wishes for a scene,
				the settings you choose, and the texts, books, videos and subtitles you upload. When you use voice
				dictation, your voice is sent for speech recognition.
			</p>
			<p>
				<strong>Usage data.</strong> Pages you visit, buttons you click, device and browser type, language,
				approximate location derived from your IP address, and the date and time of your visits.
			</p>
			<p>
				<strong>Session recordings.</strong> We record how you use the Service: page content, mouse movements,
				clicks and scrolling. The recordings include the text you type into the reply form of AI conversations.
				Other input fields, including passwords and email addresses, are hidden in the recordings.
			</p>
			<p>We do not collect special categories of personal data, such as health data or political views.</p>

			<h2>3. Why we use your data and on what legal basis</h2>

			<ul>
				<li>
					<strong>To provide the Service</strong>: create and secure your account, run AI conversations,
					generate illustrations, audio and translations, and save your history. Legal basis: performance of a
					contract (Art. 6(1)(b) GDPR).
				</li>
				<li>
					<strong>To send service emails</strong>: email confirmation, password recovery and important notices
					about the Service. Legal basis: performance of a contract.
				</li>
				<li>
					<strong>To understand and improve the Service</strong>: usage analytics and session recordings.
					Legal basis: our legitimate interest in making the Service work better (Art. 6(1)(f) GDPR). You can
					object at any time — see section 4.
				</li>
				<li>
					<strong>To keep the Service secure</strong> and prevent abuse. Legal basis: legitimate interest.
				</li>
				<li>
					<strong>To comply with the law</strong> when we are legally required to. Legal basis: legal
					obligation (Art. 6(1)(c) GDPR).
				</li>
			</ul>

			<h2>4. Cookies and similar technologies</h2>

			<p>We use cookies and your browser&apos;s local storage:</p>
			<ul>
				<li>
					<strong>Necessary</strong>: a session cookie that keeps you signed in, and local storage for your
					settings (interface language, last chosen options and so on). The Service does not work without
					them.
				</li>
				<li>
					<strong>Analytics</strong>: cookies of PostHog and Google Tag Manager, used for usage statistics and
					session recordings.
				</li>
			</ul>
			<p>
				When you first visit the Service, a banner tells you about analytics. If you click <em>Decline</em>,
				PostHog stops collecting data in that browser. You can also block or delete cookies in your browser
				settings; necessary cookies are required for signing in.
			</p>

			<h2>5. Who we share data with</h2>

			<p>
				We do not sell your personal data. We share it only with service providers that process it on our behalf
				to run the Service:
			</p>
			<ul>
				<li>
					<strong>Hosting</strong>: our servers and database are located in the European Union.
				</li>
				<li>
					<strong>File storage</strong>: Cloudflare (images, audio, uploaded files).
				</li>
				<li>
					<strong>AI models</strong>: DeepSeek, OpenAI, Google and Black Forest Labs receive the content
					needed to generate conversation replies, translations, dictionary articles and illustrations. Your
					photo is sent to an image generation provider only if you uploaded one.
				</li>
				<li>
					<strong>Speech</strong>: Soniox, Deepgram and Google for speech recognition, voice-over and
					subtitles.
				</li>
				<li>
					<strong>Email</strong>: Resend for sending service emails.
				</li>
				<li>
					<strong>Analytics</strong>: PostHog (EU cloud) and Google Tag Manager.
				</li>
				<li>
					<strong>Sign-in</strong>: Google, GitHub and Yandex, if you choose to sign in with them. They
					process your data under their own privacy policies.
				</li>
			</ul>
			<p>We may also disclose data to public authorities when we are legally required to.</p>

			<h2>6. International transfers</h2>

			<p>
				Some of the providers listed above process data outside the European Economic Area, including in the
				United States and China. Where such transfers take place, we rely on the safeguards these providers
				offer, such as the European Commission&apos;s Standard Contractual Clauses, where available.
			</p>

			<h2>7. How long we keep data</h2>

			<ul>
				<li>Account data and your content are kept while your account exists.</li>
				<li>
					After your account is deleted, your data is deleted or anonymised within 30 days, unless the law
					requires us to keep it longer.
				</li>
				<li>
					Analytics data and session recordings are kept in PostHog for a limited period and then deleted
					automatically.
				</li>
			</ul>

			<h2>8. Your rights</h2>

			<p>Under the GDPR you have the right to:</p>
			<ul>
				<li>access the personal data we hold about you and get a copy of it;</li>
				<li>have inaccurate data corrected;</li>
				<li>have your data deleted, including deleting your account;</li>
				<li>restrict processing of your data;</li>
				<li>receive your data in a portable format;</li>
				<li>object to processing based on legitimate interest, including analytics and session recordings;</li>
				<li>lodge a complaint with a data protection supervisory authority in your country.</li>
			</ul>
			<p>
				To exercise your rights, write to <a href={`mailto:${supportEmail}`}>{supportEmail}</a> from the email
				address linked to your account. We will reply within one month.
			</p>

			<h2>9. Children</h2>

			<p>
				The Service is not intended for children under 16. We do not knowingly collect data from them. If you
				believe a child has given us personal data, contact us and we will delete it.
			</p>

			<h2>10. Security</h2>

			<p>
				We use technical and organisational measures to protect your data: encrypted connections (HTTPS), hashed
				passwords and restricted access to servers and databases.
			</p>

			<h2>11. Changes to this Policy</h2>

			<p>
				We may update this Policy. The current version is always available on this page, and the date of the
				last update is shown at the top. If the changes are significant, we will notify registered users by
				email.
			</p>

			<h2>12. Contact</h2>

			<p>
				Andrew Kozinsky, operator of Immersia
				<br />
				Email: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
			</p>
		</div>
	)
}

export default PrivacyPolicyIntlPage
