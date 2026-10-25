import { AiDialogueScenarioSeedData, localized } from '../common'

export const cityAndServicesScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'at-the-dentist',
		groupSlug: 'city-and-services',
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
		slug: 'pool-membership',
		groupSlug: 'city-and-services',
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
]
