import { Language } from 'utils/languages'
import { EmailContent } from 'infrastructure/emailAdapter/email-adapter.service'
import { insertSiteName, renderActionEmail } from './emailLayout'

type PasswordRecoveryTexts = {
	subject: string
	heading: string
	intro: string
	actionLabel: string
	note: string
}

const passwordRecoveryTexts: Record<Language, PasswordRecoveryTexts> = {
	en: {
		subject: 'Reset your {siteName} password',
		heading: 'Password reset',
		intro: 'We received a request to reset the password for your {siteName} account.',
		actionLabel: 'Reset password',
		note: 'If you didn’t request a password reset, just ignore this email. Your password will stay the same.',
	},
	es: {
		subject: 'Restablece tu contraseña de {siteName}',
		heading: 'Restablecer contraseña',
		intro: 'Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en {siteName}.',
		actionLabel: 'Restablecer contraseña',
		note: 'Si no has solicitado restablecer la contraseña, simplemente ignora este correo. Tu contraseña no cambiará.',
	},
	fr: {
		subject: 'Réinitialisez votre mot de passe {siteName}',
		heading: 'Réinitialisation du mot de passe',
		intro: 'Nous avons reçu une demande de réinitialisation du mot de passe de votre compte {siteName}.',
		actionLabel: 'Réinitialiser le mot de passe',
		note: 'Si vous n’avez pas demandé de réinitialisation, ignorez simplement cet e-mail. Votre mot de passe restera inchangé.',
	},
	de: {
		subject: 'Passwort für {siteName} zurücksetzen',
		heading: 'Passwort zurücksetzen',
		intro: 'Wir haben eine Anfrage zum Zurücksetzen des Passworts für Ihr {siteName}-Konto erhalten.',
		actionLabel: 'Passwort zurücksetzen',
		note: 'Wenn Sie das nicht angefordert haben, ignorieren Sie diese E-Mail einfach. Ihr Passwort bleibt unverändert.',
	},
	it: {
		subject: 'Reimposta la password di {siteName}',
		heading: 'Reimpostazione della password',
		intro: 'Abbiamo ricevuto una richiesta di reimpostazione della password del tuo account {siteName}.',
		actionLabel: 'Reimposta password',
		note: 'Se non hai richiesto la reimpostazione, ignora semplicemente questa email. La tua password resterà invariata.',
	},
	tr: {
		subject: '{siteName} şifrenizi sıfırlayın',
		heading: 'Şifre sıfırlama',
		intro: '{siteName} hesabınızın şifresini sıfırlama talebi aldık.',
		actionLabel: 'Şifreyi sıfırla',
		note: 'Şifre sıfırlama talebinde bulunmadıysanız bu e-postayı dikkate almayın. Şifreniz değişmeyecek.',
	},
	ru: {
		subject: 'Восстановление пароля на {siteName}',
		heading: 'Восстановление пароля',
		intro: 'Мы получили запрос на восстановление пароля от вашего аккаунта на {siteName}.',
		actionLabel: 'Задать новый пароль',
		note: 'Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо — пароль останется прежним.',
	},
}

/**
 * Письмо со ссылкой на страницу установки нового пароля.
 * @param input.locale язык интерфейса, на котором пользователь запросил восстановление.
 * @param input.recoveryUrl полная ссылка на страницу восстановления с кодом.
 */
export function buildPasswordRecoveryEmail(input: {
	locale: Language
	siteName: string
	recoveryUrl: string
}): EmailContent {
	const { locale, siteName, recoveryUrl } = input
	const texts = passwordRecoveryTexts[locale]

	return renderActionEmail({
		locale,
		subject: insertSiteName(texts.subject, siteName),
		heading: insertSiteName(texts.heading, siteName),
		intro: insertSiteName(texts.intro, siteName),
		actionLabel: texts.actionLabel,
		actionUrl: recoveryUrl,
		note: insertSiteName(texts.note, siteName),
	})
}
