import { Language } from 'utils/languages'
import { EmailContent } from 'infrastructure/emailAdapter/email-adapter.service'
import { insertSiteName, renderActionEmail } from './emailLayout'

type EmailConfirmationTexts = {
	subject: string
	heading: string
	intro: string
	actionLabel: string
	note: string
}

const emailConfirmationTexts: Record<Language, EmailConfirmationTexts> = {
	en: {
		subject: 'Confirm your email for {siteName}',
		heading: 'Welcome to {siteName}!',
		intro: 'To finish signing up, please confirm your email address.',
		actionLabel: 'Confirm email',
		note: 'If you didn’t sign up for {siteName}, just ignore this email.',
	},
	es: {
		subject: 'Confirma tu correo electrónico en {siteName}',
		heading: '¡Te damos la bienvenida a {siteName}!',
		intro: 'Para completar el registro, confirma tu dirección de correo electrónico.',
		actionLabel: 'Confirmar correo',
		note: 'Si no has creado una cuenta en {siteName}, simplemente ignora este correo.',
	},
	fr: {
		subject: 'Confirmez votre adresse e-mail sur {siteName}',
		heading: 'Bienvenue sur {siteName} !',
		intro: 'Pour finaliser votre inscription, confirmez votre adresse e-mail.',
		actionLabel: 'Confirmer l’adresse e-mail',
		note: 'Si vous n’avez pas créé de compte sur {siteName}, ignorez simplement cet e-mail.',
	},
	de: {
		subject: 'Bestätigen Sie Ihre E-Mail-Adresse bei {siteName}',
		heading: 'Willkommen bei {siteName}!',
		intro: 'Um die Registrierung abzuschließen, bestätigen Sie bitte Ihre E-Mail-Adresse.',
		actionLabel: 'E-Mail bestätigen',
		note: 'Wenn Sie sich nicht bei {siteName} registriert haben, ignorieren Sie diese E-Mail einfach.',
	},
	it: {
		subject: 'Conferma il tuo indirizzo email su {siteName}',
		heading: 'Ti diamo il benvenuto su {siteName}!',
		intro: 'Per completare la registrazione, conferma il tuo indirizzo email.',
		actionLabel: 'Conferma email',
		note: 'Se non hai creato un account su {siteName}, ignora semplicemente questa email.',
	},
	tr: {
		subject: '{siteName} için e-posta adresinizi onaylayın',
		heading: '{siteName} ailesine hoş geldiniz!',
		intro: 'Kaydınızı tamamlamak için lütfen e-posta adresinizi onaylayın.',
		actionLabel: 'E-postayı onayla',
		note: '{siteName} üzerinde hesap oluşturmadıysanız bu e-postayı dikkate almayın.',
	},
	ru: {
		subject: 'Подтвердите почту на {siteName}',
		heading: 'Добро пожаловать в {siteName}!',
		intro: 'Чтобы завершить регистрацию, подтвердите адрес электронной почты.',
		actionLabel: 'Подтвердить почту',
		note: 'Если вы не регистрировались на {siteName}, просто проигнорируйте это письмо.',
	},
}

/**
 * Письмо со ссылкой для подтверждения почты после регистрации.
 * @param input.locale язык интерфейса, на котором пользователь регистрировался.
 * @param input.siteUrl главная страница сайта на языке письма для ссылки в подвале.
 * @param input.confirmationUrl полная ссылка на страницу подтверждения с кодом.
 */
export function buildEmailConfirmationEmail(input: {
	locale: Language
	siteName: string
	siteUrl: string
	confirmationUrl: string
}): EmailContent {
	const { locale, siteName, siteUrl, confirmationUrl } = input
	const texts = emailConfirmationTexts[locale]

	return renderActionEmail({
		locale,
		subject: insertSiteName(texts.subject, siteName),
		heading: insertSiteName(texts.heading, siteName),
		intro: insertSiteName(texts.intro, siteName),
		actionLabel: texts.actionLabel,
		actionUrl: confirmationUrl,
		note: insertSiteName(texts.note, siteName),
		siteName,
		siteUrl,
	})
}
