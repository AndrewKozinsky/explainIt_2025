import { AiDialogueScenarioSeedData, localized } from '../common'

export const englishScenarios: AiDialogueScenarioSeedData[] = [
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
			en: "You come for a dentist appointment: check in at the reception, describe your complaint, answer the doctor's questions and discuss treatment. Level A2–B1.",
			es: 'Acudes a una cita con el dentista: te registras en recepción, describes tu molestia, respondes a las preguntas del médico y hablas sobre el tratamiento. Nivel A2–B1.',
			fr: "Vous venez à un rendez-vous chez le dentiste : vous vous enregistrez à l'accueil, décrivez votre problème, répondez aux questions du médecin et discutez du traitement. Niveau A2–B1.",
			de: 'Sie kommen zu einem Zahnarzttermin: melden Sie sich an der Rezeption an, beschreiben Sie Ihre Beschwerden, beantworten Sie die Fragen des Arztes und besprechen Sie die Behandlung. Niveau A2–B1.',
			it: 'Vieni a un appuntamento dal dentista: ti registri alla reception, descrivi il tuo disturbo, rispondi alle domande del medico e parli del trattamento. Livello A2–B1.',
			tr: 'Dişçi randevusuna geliyorsunuz: resepsiyonda kayıt oluyorsunuz, şikâyetinizi anlatıyorsunuz, doktorun sorularını yanıtlıyor ve tedaviyi konuşuyorsunuz. Seviye A2–B1.',
			ru: 'Вы приходите на приём к стоматологу: регистрируетесь на ресепшене, рассказываете о жалобе, отвечаете на вопросы врача и обсуждаете лечение. Уровень A2–B1.',
		}),
		systemPrompt:
			"You are a friendly dentist named Dr. Collins. The user is a patient who has come for an appointment. Greet the patient, ask what hurts, how long, and how bad; ask a few follow-up questions about habits and allergies; explain the problem in simple words and suggest treatment; answer the patient's questions. Keep replies short (1–3 sentences) and use simple A2–B1 language. Stay in character the whole time. If the learner makes a grammar mistake, gently rephrase it in your next reply without a lecture.",
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
			en: 'You go through passport control at the airport: the officer asks about the purpose of your visit, length of stay and place of residence. Level A2–B1.',
			es: 'Pasas el control de pasaportes en el aeropuerto: el agente te pregunta por el motivo de tu visita, la duración de la estancia y el lugar de alojamiento. Nivel A2–B1.',
			fr: "Vous passez le contrôle des passeports à l'aéroport : l'agent vous interroge sur le motif de votre visite, la durée du séjour et le lieu de résidence. Niveau A2–B1.",
			de: 'Sie passieren die Passkontrolle am Flughafen: der Beamte fragt nach dem Zweck Ihres Besuchs, der Aufenthaltsdauer und dem Wohnort. Niveau A2–B1.',
			it: "Passi il controllo passaporti in aeroporto: l'agente ti chiede lo scopo della visita, la durata del soggiorno e il luogo di residenza. Livello A2–B1.",
			tr: 'Havaalanında pasaport kontrolünden geçiyorsunuz: memur ziyaret amacınızı, kalış sürenizi ve kalacağınız yeri soruyor. Seviye A2–B1.',
			ru: 'Вы проходите паспортный контроль в аэропорту: офицер спрашивает о цели визита, сроке пребывания и месте жительства. Уровень A2–B1.',
		}),
		systemPrompt:
			"You are a polite passport control officer at an airport. The user is a traveller going through passport control. Ask for the passport, the purpose and length of the visit, where the traveller will stay, and if they have anything to declare. Use short, simple questions (A2–B1). Stay in character and never step out of the officer role. If the learner makes a mistake, rephrase correctly in your next reply without a lecture.",
	},
	{
		slug: 'pool-membership',
		title: localized({
			en: 'Buying a Pool Membership',
			es: 'Comprar un abono de piscina',
			fr: 'Acheter un abonnement à la piscine',
			de: 'Eine Schwimmbad-Mitgliedschaft kaufen',
			it: 'Comprare un abbonamento in piscina',
			tr: 'Havuz üyeliği satın alma',
			ru: 'Покупка абонемента в бассейн',
		}),
		description: localized({
			en: 'You come to the pool to buy a membership: find out the tariffs and schedule, choose the right option and pay for it. Level A2–B1.',
			es: 'Vienes a la piscina a comprar un abono: infórmate de las tarifas y el horario, elige la opción adecuada y págala. Nivel A2–B1.',
			fr: 'Vous venez à la piscine acheter un abonnement : renseignez-vous sur les tarifs et les horaires, choisissez la formule adaptée et payez-la. Niveau A2–B1.',
			de: 'Sie kommen ins Schwimmbad, um eine Mitgliedschaft zu kaufen: informieren Sie sich über Tarife und Zeitplan, wählen Sie die passende Option und bezahlen Sie sie. Niveau A2–B1.',
			it: "Vieni in piscina a comprare un abbonamento: informati su tariffe e orari, scegli l'opzione giusta e pagala. Livello A2–B1.",
			tr: 'Havuza üyelik satın almak için geliyorsunuz: tarifeleri ve programı öğreniyorsunuz, uygun seçeneği seçiyor ve ödemesini yapıyorsunuz. Seviye A2–B1.',
			ru: 'Вы приходите в бассейн купить абонемент: узнаёте тарифы и расписание, выбираете подходящий вариант и оформляете его. Уровень A2–B1.',
		}),
		systemPrompt:
			'You are a helpful receptionist at a swimming pool. The user wants to buy a membership. Ask what kind of membership they want, present the tariffs and schedule, answer questions about prices and rules, and complete the purchase. Keep replies short and use simple A2–B1 language. Stay in character the whole time. If the learner makes a mistake, rephrase correctly without a lecture.',
	},
]
