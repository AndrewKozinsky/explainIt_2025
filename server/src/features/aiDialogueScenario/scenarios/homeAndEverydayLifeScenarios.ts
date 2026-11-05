import { AiDialogueScenarioSeedData, localized, localizedList } from '../common'

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
		userScenarioAmendmentHint: localized({
			en: 'For example: a little girl is knocking, she has lost her kitten',
			es: 'Por ejemplo: llama una niña pequeña que ha perdido a su gatito',
			fr: 'Par exemple : une petite fille frappe, elle a perdu son chaton',
			de: 'Zum Beispiel: Ein kleines Mädchen klopft, es hat sein Kätzchen verloren',
			it: 'Per esempio: bussa una bambina che ha perso il suo gattino',
			tr: 'Örneğin: kapıyı küçük bir kız çalıyor, yavru kedisini kaybetmiş',
			ru: 'Например: стучит маленькая девочка, она потеряла котёнка',
		}),
		conversationIdeas: localizedList({
			en: ['Find out who has come and why', 'Invite the visitor in', 'Politely say no and close the door'],
			es: [
				'Averiguar quién ha venido y para qué',
				'Invitar al visitante a pasar',
				'Decir que no con educación y cerrar la puerta',
			],
			fr: [
				'Savoir qui est là et pourquoi',
				'Inviter le visiteur à entrer',
				'Refuser poliment et fermer la porte',
			],
			de: [
				'Herausfinden, wer gekommen ist und warum',
				'Den Besucher hereinbitten',
				'Höflich ablehnen und die Tür schließen',
			],
			it: [
				'Scoprire chi è venuto e perché',
				'Invitare il visitatore a entrare',
				'Rifiutare con gentilezza e chiudere la porta',
			],
			tr: [
				'Kimin ve neden geldiğini öğrenmek',
				'Ziyaretçiyi içeri davet etmek',
				'Kibarca reddedip kapıyı kapatmak',
			],
			ru: ['Узнать, кто пришёл и зачем', 'Пригласить гостя войти', 'Вежливо отказать и закрыть дверь'],
		}),
		trainedSkills: localized({
			en: 'Start a conversation with a stranger and politely set boundaries',
			es: 'Iniciar una conversación con un desconocido y poner límites con educación',
			fr: 'Engager la conversation avec un inconnu et poser des limites poliment',
			de: 'Ein Gespräch mit einem Fremden beginnen und höflich Grenzen setzen',
			it: 'Avviare una conversazione con uno sconosciuto e porre limiti con gentilezza',
			tr: 'Bir yabancıyla konuşma başlatmak ve kibarca sınır koymak',
			ru: 'Начинать разговор с незнакомцем и вежливо устанавливать границы',
		}),
		systemPrompt:
			"The participant is at home in their own apartment. The predefined opening is: they hear a knock at the front door, open it, and see what is outside. Narrate this brief sequence in the opening sceneUpdate without waiting for a separate participant action to open the door. You choose who is at the door and why they have come; no visitor identity, role, appearance or purpose is prescribed. Give the visitor a consistent personality and a plausible reason for being there, and let the participant discover more through the encounter. The opening sceneUpdate's visual must depict the final moment of this sequence: the door is already open, the participant remains inside their apartment at the threshold, and the visitor is visible outside. Include the visible visitor's npcId in participants. Begin the visitor's natural reaction or greeting, then leave the participant free to respond. Opening the door is the only predefined participant action; do not invent further speech, decisions, invitations or consent for them. Respond naturally to their choices and stay in character.",
	},
]
