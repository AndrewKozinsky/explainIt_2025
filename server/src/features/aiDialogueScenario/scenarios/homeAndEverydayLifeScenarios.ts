import { AiDialogueScenarioSeedData, localized } from '../common'

export const homeAndEverydayLifeScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'knock-at-the-door',
		groupSlug: 'home-and-everyday-life',
		title: localized({
			en: 'A Knock at the Door',
			es: 'Llaman a la puerta',
			fr: 'On frappe à la porte',
			de: 'Es klopft an der Tür',
			it: 'Qualcuno bussa alla porta',
			tr: 'Kapı çalıyor',
			ru: 'Стук в дверь',
		}),
		description: localized({
			en: 'You are at home when someone knocks at the front door. You open it and discover who has come.',
			es: 'Estás en casa cuando alguien llama a la puerta de entrada. La abres y descubres quién ha venido.',
			fr: 'Vous êtes chez vous quand quelqu’un frappe à la porte d’entrée. Vous ouvrez et découvrez qui est là.',
			de: 'Sie sind zu Hause, als jemand an die Wohnungstür klopft. Sie öffnen die Tür und sehen, wer gekommen ist.',
			it: 'Sei a casa quando qualcuno bussa alla porta di ingresso. Apri e scopri chi è venuto.',
			tr: 'Evdesiniz ve birisi giriş kapısını çalıyor. Kapıyı açıp kimin geldiğini görüyorsunuz.',
			ru: 'Вы у себя дома и слышите стук во входную дверь. Вы открываете её и видите, кто пришёл.',
		}),
		systemPrompt:
			"The participant is at home in their own apartment. The predefined opening is: they hear a knock at the front door, open it, and see what is outside. Narrate this brief sequence in the opening sceneUpdate without waiting for a separate participant action to open the door. You choose who is at the door and why they have come; no visitor identity, role, appearance or purpose is prescribed. Give the visitor a consistent personality and a plausible reason for being there, and let the participant discover more through the encounter. The opening sceneUpdate's visual must depict the final moment of this sequence: the door is already open, the participant remains inside their apartment at the threshold, and the visitor is visible outside. Include the visible visitor's npcId in participants. Begin the visitor's natural reaction or greeting, then leave the participant free to respond. Opening the door is the only predefined participant action; do not invent further speech, decisions, invitations or consent for them. Respond naturally to their choices and stay in character.",
	},
]
