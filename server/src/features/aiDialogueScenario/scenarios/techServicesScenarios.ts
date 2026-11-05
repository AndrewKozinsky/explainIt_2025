import { AiDialogueScenarioSeedData, localized, localizedList } from '../common'

// ЧЕРНОВИК на проверку: тексты пока только на en и ru, в getScenariosData() не подключён.

export const techServicesScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'phone-repair',
		groupSlug: 'tech-services',
		title: localized({
			en: 'Phone Repair',
			ru: 'Ремонт телефона',
		}),
		description: localized({
			en: 'You took your phone in for repair. The technician holds it in pieces: not only the screen but the board needs replacing, and it will cost three times as much.',
			ru: 'Вы отдали телефон в ремонт. Мастер держит его разобранным: менять нужно не только экран, но и плату, и выйдет в три раза дороже.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the phone fell into water, and the technician is suspiciously pushing for a quick decision',
			ru: 'Например: телефон упал в воду, а мастер подозрительно торопит с решением',
		}),
		conversationIdeas: localizedList({
			en: [
				'Agree to the repair',
				'Haggle and ask about the warranty',
				'Take the phone back if you suspect a scam',
			],
			ru: [
				'Согласиться на ремонт',
				'Поторговаться и спросить про гарантию',
				'Забрать телефон, если подозреваете обман',
			],
		}),
		trainedSkills: localized({
			en: 'Describe a fault, ask about the price and warranty and avoid being cheated',
			ru: 'Описывать поломку, спрашивать о цене и гарантии и не давать себя обмануть',
		}),
		systemPrompt:
			"The participant left their phone with a cracked screen at a small repair shop and has come back for it. You play the repair technician, with a consistent personality, holding the phone in pieces. Tell them the bad news: not only the screen but also the board needs replacing, and it will cost three times as much as agreed. You decide whether this is true or an attempt to overcharge, and keep it consistent. React to the participant's questions about the fault, the price and the warranty and to their decision. Do not decide for the participant what they do. Stay in character.",
	},
	{
		slug: 'damaged-delivery',
		groupSlug: 'tech-services',
		title: localized({
			en: 'A Damaged Parcel',
			ru: 'Мятая посылка',
		}),
		description: localized({
			en: 'A courier is at your door with a dented box and asks whether you’ll accept the parcel as it is or refuse it.',
			ru: 'Курьер стоит у двери с помятой коробкой и спрашивает, примете ли вы посылку как есть или откажетесь.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the parcel contains a fragile vase I ordered as a present',
			ru: 'Например: в посылке хрупкая ваза, заказанная в подарок',
		}),
		conversationIdeas: localizedList({
			en: [
				'Accept it and photograph the damage',
				'Refuse the parcel',
				'Ask the courier to write up a damage report',
			],
			ru: [
				'Принять и сфотографировать повреждения',
				'Отказаться от посылки',
				'Попросить курьера составить акт о повреждении',
			],
		}),
		trainedSkills: localized({
			en: 'Describe damage and stand up for your rights as a customer',
			ru: 'Описывать повреждения и отстаивать свои права покупателя',
		}),
		systemPrompt:
			"The participant is at home and has just opened the front door to a courier holding a visibly dented box. The opening sceneUpdate's visual shows the open door with the participant inside and the courier outside; include the courier's npcId in participants. Opening the door is the only predefined participant action; do not decide anything else for them. You play the courier, with a consistent personality and a busy schedule. Point out the damage and ask whether they accept the parcel as it is or refuse it. React to the participant's questions and decisions, and explain the delivery company's procedure as a real courier would. Stay in character.",
	},
	{
		slug: 'courier-lost',
		groupSlug: 'tech-services',
		title: localized({
			en: 'A Lost Courier',
			ru: 'Курьер не может найти дом',
		}),
		description: localized({
			en: 'You step out into the courtyard and see a confused courier with a parcel: he is looking for building 12 and can’t find entrance three.',
			ru: 'Вы выходите во двор и видите растерянного курьера с посылкой: он ищет дом 12 и никак не найдёт третий подъезд.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the parcel turns out to be mine, but the address on it is wrong',
			ru: 'Например: посылка оказывается моей, но на ней неверный адрес',
		}),
		conversationIdeas: localizedList({
			en: ['Give directions using landmarks', 'Walk him to the entrance', 'Help sort out a wrong address'],
			ru: ['Объяснить дорогу по ориентирам', 'Проводить до подъезда', 'Помочь разобраться с неверным адресом'],
		}),
		trainedSkills: localized({
			en: 'Give directions and describe the surroundings',
			ru: 'Объяснять дорогу и описывать местность',
		}),
		systemPrompt:
			"The participant steps out into the courtyard of their apartment block and sees a confused courier, a man, with a parcel. He asks whether they know where building 12 is, saying he cannot find entrance three. You play the courier, with a consistent personality and a busy schedule. You decide the layout of the courtyard and the details of the address and keep them consistent. React to the participant's directions and help. Do not decide for the participant what they do. Stay in character.",
	},
]
