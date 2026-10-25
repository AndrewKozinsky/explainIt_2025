import { AiDialogueScenarioSeedData, localized } from '../common'

export const travelScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'passport-control',
		groupSlug: 'travel-abroad',
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
		slug: 'lost-luggage',
		groupSlug: 'travel-abroad',
		title: localized({
			en: 'Lost luggage',
			es: 'Equipaje perdido',
			fr: 'Bagages perdus',
			de: 'Verlorenes Gepäck',
			it: 'Bagaglio smarrito',
			tr: 'Kayıp bagaj',
			ru: 'Потерянный багаж',
		}),
		description: localized({
			en: 'Your suitcase has not arrived. You ask an airport baggage service agent for help.',
			es: 'Tu maleta no ha llegado. Pides ayuda en el servicio de equipajes del aeropuerto.',
			fr: 'Votre valise n’est pas arrivée. Vous demandez de l’aide au service des bagages de l’aéroport.',
			de: 'Ihr Koffer ist nicht angekommen. Sie bitten die Gepäckermittlung am Flughafen um Hilfe.',
			it: 'La tua valigia non è arrivata. Chiedi aiuto al servizio bagagli dell’aeroporto.',
			tr: 'Valiziniz gelmedi. Havaalanındaki bagaj hizmetleri görevlisinden yardım istiyorsunuz.',
			ru: 'Ваш чемодан не прилетел. Вы обращаетесь за помощью в службу розыска багажа в аэропорту.',
		}),
		systemPrompt:
			'The participant is at an airport baggage service desk because their suitcase has not arrived. You play a baggage service agent with a consistent personality. Begin by greeting them and asking how you can help. Ask relevant follow-up questions about their flight, baggage tag and suitcase, one or two at a time. Explain the tracing process and discuss contact details or delivery when relevant. Let the participant describe the problem and make their own choices. Do not assume their personal details or promise that the suitcase has already been found. Stay in character and respond naturally to the conversation.',
	},
	{
		slug: 'hotel-check-in',
		groupSlug: 'travel-abroad',
		title: localized({
			en: 'Hotel check-in',
			es: 'Registro en el hotel',
			fr: 'Arrivée à l’hôtel',
			de: 'Im Hotel einchecken',
			it: 'Check-in in hotel',
			tr: 'Otele giriş',
			ru: 'Заселение в отель',
		}),
		description: localized({
			en: 'You arrive at a hotel and speak to the receptionist about checking in.',
			es: 'Llegas a un hotel y hablas con la persona de recepción para registrarte.',
			fr: 'Vous arrivez à l’hôtel et vous adressez à la réception pour vous enregistrer.',
			de: 'Sie kommen im Hotel an und sprechen mit der Rezeption über das Einchecken.',
			it: 'Arrivi in hotel e parli con la persona alla reception per fare il check-in.',
			tr: 'Otele geliyorsunuz ve giriş işlemleri için resepsiyon görevlisiyle konuşuyorsunuz.',
			ru: 'Вы приезжаете в отель и обращаетесь к администратору, чтобы заселиться.',
		}),
		systemPrompt:
			'The participant has just arrived at a hotel reception. You play the receptionist, with a consistent personality and a believable hotel setting. Welcome them and ask whether they have a reservation. Let them provide their own name, booking details and preferences. Discuss room availability, check-in requirements, breakfast or hotel facilities as these become relevant. Give only as much information as the moment calls for. Do not complete the check-in, invent payment or consent, or make decisions on behalf of the participant. Stay in character and react naturally to their questions and social contributions.',
	},
	{
		slug: 'hotel-room-problem',
		groupSlug: 'travel-abroad',
		title: localized({
			en: 'A problem with your room',
			es: 'Un problema con la habitación',
			fr: 'Un problème dans votre chambre',
			de: 'Ein Problem mit dem Zimmer',
			it: 'Un problema con la camera',
			tr: 'Odayla ilgili bir sorun',
			ru: 'Проблема с номером',
		}),
		description: localized({
			en: 'The air conditioning in your hotel room is not working. You discuss a solution at reception.',
			es: 'El aire acondicionado de tu habitación no funciona. Hablas con recepción para buscar una solución.',
			fr: 'La climatisation de votre chambre ne fonctionne pas. Vous cherchez une solution à la réception.',
			de: 'Die Klimaanlage in Ihrem Hotelzimmer funktioniert nicht. Sie besprechen eine Lösung an der Rezeption.',
			it: 'L’aria condizionata della tua camera non funziona. Discuti una soluzione alla reception.',
			tr: 'Otel odanızdaki klima çalışmıyor. Resepsiyonda bir çözüm arıyorsunuz.',
			ru: 'В вашем номере не работает кондиционер. Вы обсуждаете решение с администратором отеля.',
		}),
		systemPrompt:
			'The participant is staying at a hotel where the air conditioning in their room is not working. The opening scene places them at the reception desk. You play a hotel receptionist with a consistent personality. Greet them and invite them to explain what is wrong. Ask relevant questions and offer plausible options such as maintenance or an available alternative room. Discuss timing and preferences through the conversation instead of listing every option at once. Do not assume that the participant has accepted a solution or moved rooms. Keep the encounter polite and believable, and stay in character.',
	},
]
