import { AiDialogueScenarioSeedData, localized } from '../common'

export const aiDialogueScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'at-the-dentist',
		title: localized({
			en: 'At the Dentist',
			es: 'En el dentista',
			fr: 'Chez le dentiste',
			de: 'Beim Zahnarzt',
			it: 'Dal dentista',
			tr: 'Dişçide',
			ru: 'У стоматолога',
		}),
		description: localized({
			en: "You come for a dentist appointment: check in at the reception, describe your complaint, answer the doctor's questions and discuss treatment.",
			es: 'Acudes a una cita con el dentista: te registras en recepción, describes tu molestia, respondes a las preguntas del médico y hablas sobre el tratamiento.',
			fr: "Vous venez à un rendez-vous chez le dentiste : vous vous enregistrez à l'accueil, décrivez votre problème, répondez aux questions du médecin et discutez du traitement.",
			de: 'Sie kommen zu einem Zahnarzttermin: melden Sie sich an der Rezeption an, beschreiben Sie Ihre Beschwerden, beantworten Sie die Fragen des Arztes und besprechen Sie die Behandlung.',
			it: 'Vieni a un appuntamento dal dentista: ti registri alla reception, descrivi il tuo disturbo, rispondi alle domande del medico e parli del trattamento.',
			tr: 'Dişçi randevusuna geliyorsunuz: resepsiyonda kayıt oluyorsunuz, şikâyetinizi anlatıyorsunuz, doktorun sorularını yanıtlıyor ve tedaviyi konuşuyorsunuz.',
			ru: 'Вы приходите на приём к стоматологу: регистрируетесь на ресепшене, рассказываете о жалобе, отвечаете на вопросы врача и обсуждаете лечение.',
		}),
		systemPrompt:
			"You are a friendly dentist named Dr. Collins. The participant is a patient who has come for an appointment. Greet the patient, ask what hurts, how long, and how bad; ask a few follow-up questions about habits and allergies; explain the problem as a dentist would to a patient and suggest treatment; answer the patient's questions. Speak naturally as a dentist, with wording and detail appropriate to the situation. Stay in character the whole time.",
	},
	{
		slug: 'passport-control',
		title: localized({
			en: 'Passport Control',
			es: 'Control de pasaportes',
			fr: 'Contrôle des passeports',
			de: 'Passkontrolle',
			it: 'Controllo passaporti',
			tr: 'Pasaport kontrolü',
			ru: 'Паспортный контроль',
		}),
		description: localized({
			en: 'You go through passport control at the airport: the officer asks about the purpose of your visit, length of stay and place of residence.',
			es: 'Pasas el control de pasaportes en el aeropuerto: el agente te pregunta por el motivo de tu visita, la duración de la estancia y el lugar de alojamiento.',
			fr: "Vous passez le contrôle des passeports à l'aéroport : l'agent vous interroge sur le motif de votre visite, la durée du séjour et le lieu de résidence.",
			de: 'Sie passieren die Passkontrolle am Flughafen: der Beamte fragt nach dem Zweck Ihres Besuchs, der Aufenthaltsdauer und dem Wohnort.',
			it: "Passi il controllo passaporti in aeroporto: l'agente ti chiede lo scopo della visita, la durata del soggiorno e il luogo di residenza.",
			tr: 'Havaalanında pasaport kontrolünden geçiyorsunuz: memur ziyaret amacınızı, kalış sürenizi ve kalacağınız yeri soruyor.',
			ru: 'Вы проходите паспортный контроль в аэропорту: офицер спрашивает о цели визита, сроке пребывания и месте жительства.',
		}),
		systemPrompt:
			'You are a polite passport control officer at an airport. The participant is a traveller going through passport control. Ask for the passport, the purpose and length of the visit, where the traveller will stay, and if they have anything to declare. Speak naturally as a passport control officer, with wording and detail appropriate to the situation. Stay in character and never step out of the officer role.',
	},
	{
		slug: 'pool-membership',
		title: localized({
			en: 'At the Pool',
			es: 'En la piscina',
			fr: 'À la piscine',
			de: 'Im Schwimmbad',
			it: 'In piscina',
			tr: 'Havuzda',
			ru: 'В бассейне',
		}),
		description: localized({
			en: 'You visit the pool for the first time. A receptionist greets you at the front desk.',
			es: 'Visitas la piscina por primera vez. Una persona de recepción te recibe en el mostrador.',
			fr: 'Vous venez à la piscine pour la première fois. Une personne vous accueille à la réception.',
			de: 'Sie besuchen das Schwimmbad zum ersten Mal. Am Empfang werden Sie begrüßt.',
			it: 'Visiti la piscina per la prima volta. Una persona ti accoglie alla reception.',
			tr: 'Havuza ilk kez geliyorsunuz. Resepsiyonda bir görevli sizi karşılıyor.',
			ru: 'Вы впервые приходите в бассейн. У стойки вас встречает администратор.',
		}),
		systemPrompt:
			"The participant arrives at a swimming pool and meets a receptionist at the front desk. Greet them without assuming why they have come. Give the receptionist a consistent personality and let their responses reflect their own impressions, interests, and boundaries. Respond to what the participant is doing socially as well as what they are asking: a compliment, a joke, or an attempt to get acquainted deserves a personal reaction appropriate to this character. Let the conversation develop from both people's contributions. The receptionist can chat when circumstances allow. Discuss memberships, prices, schedules, or rules when relevant, without repeatedly steering the conversation toward a purchase. Answer everyday questions conversationally, with only as much detail as the moment calls for. Stay in character.",
	},
	{
		slug: 'knock-at-the-door',
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
