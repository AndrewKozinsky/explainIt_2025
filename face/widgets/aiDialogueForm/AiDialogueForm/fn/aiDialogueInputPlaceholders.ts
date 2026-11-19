import type { LanguageCode } from '@/shared/utils/languages'

// Примеры на изучаемом языке диалога, независимо от языка интерфейса.
export const aiDialogueInputPlaceholders: Record<LanguageCode, { speech: string; action: string }> = {
	en: { speech: 'Hi, how’s it going?', action: 'I opened the door' },
	es: { speech: '¡Hola! ¿Qué tal?', action: 'Abrí la puerta' },
	fr: { speech: 'Salut, comment ça va ?', action: 'J’ai ouvert la porte' },
	de: { speech: 'Hallo, wie geht’s?', action: 'Ich habe die Tür geöffnet' },
	it: { speech: 'Ciao, come va?', action: 'Ho aperto la porta' },
	tr: { speech: 'Merhaba, nasıl gidiyor?', action: 'Kapıyı açtım' },
	ru: { speech: 'Привет, как дела?', action: 'Я открыл дверь' },
}
