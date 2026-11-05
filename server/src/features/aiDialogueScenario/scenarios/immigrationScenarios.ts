import { AiDialogueScenarioSeedData, localized, localizedList } from '../common'

// ЧЕРНОВИК на проверку: тексты пока только на en и ru, в getScenariosData() не подключён.

/**
 * Добавляет к промпту общее для группы правило о стране переезда и языке.
 * Страну задаёт пользователь в пожеланиях; визовые требования — типовые, без точных сумм и сроков.
 */
function withImmigrationCountryRule(scenarioPrompt: string): string {
	return `${scenarioPrompt} The destination country is not fixed by this scenario: use the country from the participant's wishes; if they did not name one, choose a country where the dialogue language is spoken. Everyone in the scene speaks the dialogue language with the participant, even if the country has another official language. Keep immigration, visa and document requirements realistic but generic: do not state exact fees, amounts, deadlines or processing times as facts.`
}

export const immigrationScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'visa-interview',
		groupSlug: 'immigration',
		title: localized({
			en: 'Visa Interview at the Embassy',
			ru: 'Собеседование в посольстве',
		}),
		description: localized({
			en: 'You have come to the embassy of the country you plan to move to. The consular officer behind the glass asks about the purpose of your trip, your job and your finances.',
			ru: 'Вы пришли в посольство страны, куда собираетесь переехать. Консул за стеклом расспрашивает о цели поездки, работе и деньгах.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I’m moving to Canada on a work visa, the consul is suspicious',
			ru: 'Например: переезжаю в Канаду по рабочей визе, консул недоверчивый',
		}),
		conversationIdeas: localizedList({
			en: ['Explain why you are moving', 'Talk about your job and income', 'Ask which documents are needed'],
			ru: ['Объяснить, зачем переезжаете', 'Рассказать о работе и доходах', 'Спросить, какие документы нужны'],
		}),
		trainedSkills: localized({
			en: 'Talk confidently about your plans, work and money in an official interview',
			ru: 'Уверенно рассказывать о своих планах, работе и деньгах на официальном собеседовании',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has come to the embassy or consulate of the country they plan to move to for a visa interview. You play the consular officer sitting behind a glass window, with a consistent personality. Greet them, ask for their passport and application, and interview them about the purpose of the move, their job or studies, their finances and family ties, one or two questions at a time. React to vague or inconsistent answers as a real officer would and ask follow-up questions. Do not decide in advance whether the visa will be granted; let the outcome depend on the conversation. Do not invent the participant's answers or documents. Stay in character.",
		),
	},
	{
		slug: 'airport-check-in',
		groupSlug: 'immigration',
		title: localized({
			en: 'Checking In for the Flight',
			ru: 'Регистрация на рейс',
		}),
		description: localized({
			en: 'You are flying to your new country and come up to the check-in desk. An airline agent checks you in for the flight.',
			ru: 'Вы улетаете в новую страну и подходите к стойке регистрации. Сотрудник авиакомпании оформляет вас на рейс.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I have two big suitcases and a cat in a carrier',
			ru: 'Например: у меня два больших чемодана и кошка в переноске',
		}),
		conversationIdeas: localizedList({
			en: [
				'Check in your luggage and ask about hand luggage',
				'Ask for a window or aisle seat',
				'Sort it out if your bag is overweight',
			],
			ru: [
				'Сдать багаж и узнать про ручную кладь',
				'Попросить место у окна или у прохода',
				'Договориться, если у багажа перевес',
			],
		}),
		trainedSkills: localized({
			en: 'Sort out luggage, seats and documents before a flight',
			ru: 'Решать вопросы с багажом, местом и документами перед вылетом',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant is at an airport check-in desk with their luggage, about to fly to the country they are moving to. You play the airline check-in agent, with a consistent personality. Greet them and start the check-in by asking for their passport and booking. You choose what comes up at this check-in, such as baggage weight, seat choice, hand luggage or questions about travel documents, and let the situation develop from the participant's answers. Do not decide for the participant how much luggage they have or what they choose. Stay in character.",
		),
	},
	{
		slug: 'departure-passport-control',
		groupSlug: 'immigration',
		title: localized({
			en: 'Passport Control on Departure',
			ru: 'Паспортный контроль на вылете',
		}),
		description: localized({
			en: 'You are leaving the country for good. A border officer flips through your passport and asks questions.',
			ru: 'Вы улетаете из страны насовсем. Пограничник листает ваш паспорт и задаёт вопросы.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the officer notices I have a one-way ticket',
			ru: 'Например: пограничник замечает, что у меня билет в один конец',
		}),
		conversationIdeas: localizedList({
			en: [
				'Explain where you are flying and why',
				'Show your visa and documents',
				'Calmly answer an unexpected question',
			],
			ru: [
				'Объяснить, куда и зачем летите',
				'Показать визу и документы',
				'Спокойно ответить на неожиданный вопрос',
			],
		}),
		trainedSkills: localized({
			en: 'Answer a border officer’s questions about your trip briefly and calmly',
			ru: 'Коротко и спокойно отвечать на вопросы пограничника о поездке',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant is at departure passport control in an airport of the country they are leaving, flying to the country they are moving to. You play the border officer in the booth, with a consistent personality. Take their passport, flip through it and ask where they are going, why and for how long, one or two questions at a time. Ask natural follow-up questions based on their answers and documents. Do not invent the participant's answers or decide the outcome in advance. Stay in character.",
		),
	},
	{
		slug: 'plane-seatmate-emigration',
		groupSlug: 'immigration',
		title: localized({
			en: 'Seatmate on the Plane',
			ru: 'Попутчик в самолёте',
		}),
		description: localized({
			en: 'The person next to you on the plane has lived for years in the country you are flying to and is happy to tell you what life there is like.',
			ru: 'Рядом с вами в самолёте сидит человек, который давно живёт в стране, куда вы летите. Он охотно рассказывает, как там живётся.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: my seatmate is an elderly teacher who has lived there for twenty years',
			ru: 'Например: попутчица — пожилая учительница, живёт там двадцать лет',
		}),
		conversationIdeas: localizedList({
			en: ['Ask about life and prices there', 'Ask for advice on where to start', 'Share your own plans'],
			ru: ['Расспросить о жизни и ценах', 'Попросить совета, с чего начать', 'Рассказать о своих планах'],
		}),
		trainedSkills: localized({
			en: 'Keep up small talk and ask about life in another country',
			ru: 'Поддерживать светскую беседу и расспрашивать о жизни в другой стране',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant is on a plane flying to the country they are moving to. The passenger in the next seat has lived in that country for many years and starts a friendly conversation. You play this seatmate, with a consistent personality, background and opinions. Share your impressions of everyday life there, good and bad, when the conversation leads to it, and show interest in the participant. Do not lecture: respond to what the participant says and asks, and let them steer the conversation. Do not invent the participant's plans or background. Stay in character.",
		),
	},
	{
		slug: 'arrival-passport-control',
		groupSlug: 'immigration',
		title: localized({
			en: 'Passport Control on Arrival',
			ru: 'Паспортный контроль по прилёте',
		}),
		description: localized({
			en: 'You have landed in your new country. The border officer asks about the purpose of your stay, where you will live and whether you have a return ticket.',
			ru: 'Вы прилетели в новую страну. Офицер на границе спрашивает о цели приезда, где будете жить и есть ли обратный билет.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I have a student visa but haven’t found a place to live yet',
			ru: 'Например: у меня студенческая виза, а жильё ещё не найдено',
		}),
		conversationIdeas: localizedList({
			en: [
				'Explain the purpose of your stay',
				'Show your invitation or contract',
				'Explain why you have no return ticket',
			],
			ru: [
				'Объяснить цель приезда',
				'Показать приглашение или договор',
				'Объяснить, почему нет обратного билета',
			],
		}),
		trainedSkills: localized({
			en: 'Explain to a border officer why you have come and for how long',
			ru: 'Объяснять пограничнику, зачем вы приехали и надолго ли',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has just landed in the country they are moving to and is at arrival passport control. You play the border officer, with a consistent personality. Ask for their passport and documents and question them about the purpose of their stay, where they will live, how they will support themselves and whether they have a return or onward ticket, one or two questions at a time. Ask follow-up questions when answers are unclear. Do not invent the participant's answers or documents, and do not decide the outcome in advance. Stay in character.",
		),
	},
	{
		slug: 'airport-taxi-to-city',
		groupSlug: 'immigration',
		title: localized({
			en: 'Taxi from the Airport',
			ru: 'Такси из аэропорта',
		}),
		description: localized({
			en: 'You have walked out of the airport in your new country and get into a taxi. The driver checks the address and the fare.',
			ru: 'Вы вышли из аэропорта в новой стране и садитесь в такси. Водитель уточняет адрес и тариф.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the driver doesn’t know my address and offers to go by the meter',
			ru: 'Например: водитель не знает моего адреса и предлагает ехать по счётчику',
		}),
		conversationIdeas: localizedList({
			en: ['Explain where to go', 'Agree on the price in advance', 'Ask the driver about the city'],
			ru: ['Объяснить, куда ехать', 'Заранее договориться о цене', 'Расспросить водителя о городе'],
		}),
		trainedSkills: localized({
			en: 'Give an address, agree on the fare and chat with the driver',
			ru: 'Называть адрес, договариваться о цене поездки и болтать с водителем',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has just arrived in the country they are moving to and is getting into a taxi outside the airport with their luggage. You play the taxi driver, with a consistent personality. Greet them, ask where they are going and discuss the route and the fare. Let the participant give their own address and make their own choices. During the ride, react naturally to small talk about the city and life there. Do not invent the participant's destination or agree to anything on their behalf. Stay in character.",
		),
	},
	{
		slug: 'immigration-hotel-check-in',
		groupSlug: 'immigration',
		title: localized({
			en: 'A Hotel for the First Nights',
			ru: 'Отель на первое время',
		}),
		description: localized({
			en: 'You have just moved and are checking in to a hotel while you look for a place to live. The receptionist books your first nights in the new country.',
			ru: 'Вы только что переехали и заселяетесь в отель, пока ищете жильё. Администратор оформляет первые ночи в новой стране.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I don’t know how many nights I’ll stay and want a discount for a long stay',
			ru: 'Например: не знаю, на сколько ночей останусь, и хочу скидку за долгое проживание',
		}),
		conversationIdeas: localizedList({
			en: [
				'Agree on the length of stay and a long-stay price',
				'Ask about laundry and a kitchen',
				'Ask for tips on finding an apartment',
			],
			ru: [
				'Договориться о сроке и цене за долгое проживание',
				'Спросить про прачечную и кухню',
				'Попросить совета, где искать квартиру',
			],
		}),
		trainedSkills: localized({
			en: 'Arrange a stay without fixed dates and ask locals for advice',
			ru: 'Договариваться о проживании без точных дат и просить совета у местных',
		}),
		systemPrompt: withImmigrationCountryRule(
			'The participant has just moved to a new country and arrives at the reception of a modest hotel where they plan to stay while they look for a place to live; they may not know yet how long they will stay. You play the receptionist, with a consistent personality and a believable hotel. Welcome them and ask whether they have a reservation. Discuss the length of stay, prices, facilities that matter for a longer stay and local practicalities when asked. Do not complete the check-in, invent payment or make decisions for the participant. Stay in character.',
		),
	},
	{
		slug: 'buying-a-sim-card',
		groupSlug: 'immigration',
		title: localized({
			en: 'SIM Card and Phone Plan',
			ru: 'Сим-карта и тариф',
		}),
		description: localized({
			en: 'You need a local phone number. A sales assistant at a mobile phone shop offers plans and asks for your documents.',
			ru: 'Вам нужен местный номер. Продавец в салоне связи предлагает тарифы и просит документы.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I need unlimited data, and the assistant keeps pushing an expensive plan',
			ru: 'Например: нужен безлимитный интернет, а продавец навязывает дорогой тариф',
		}),
		conversationIdeas: localizedList({
			en: [
				'Explain how much you call and use data',
				'Compare plans and ask about hidden fees',
				'Turn down extras you don’t need',
			],
			ru: [
				'Объяснить, сколько звоните и пользуетесь интернетом',
				'Сравнить тарифы и спросить о скрытых платежах',
				'Отказаться от лишних услуг',
			],
		}),
		trainedSkills: localized({
			en: 'Compare plans, ask about costs and say no to extras',
			ru: 'Сравнивать тарифы, расспрашивать о цене и отказываться от лишнего',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has recently moved to a new country and walks into a mobile phone shop to get a local SIM card. You play the sales assistant, with a consistent personality. Greet them, find out what they need and offer a few believable plans, explaining the differences when asked. Ask for the identity documents a shop would typically require. You may try to sell extras as a real salesperson would, but respect the participant's decisions. Do not choose a plan for the participant or invent their documents. Stay in character.",
		),
	},
	{
		slug: 'opening-a-bank-account',
		groupSlug: 'immigration',
		title: localized({
			en: 'Opening a Bank Account',
			ru: 'Открытие банковского счёта',
		}),
		description: localized({
			en: 'You have come to a bank to open an account. The bank employee asks about your job, your address and your documents.',
			ru: 'Вы пришли в банк открыть счёт. Сотрудник расспрашивает о работе, адресе и документах.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I don’t have a permanent address yet',
			ru: 'Например: у меня пока нет постоянного адреса',
		}),
		conversationIdeas: localizedList({
			en: [
				'Find out which account suits you',
				'Ask about fees and cards',
				'Explain which documents you don’t have yet',
			],
			ru: [
				'Узнать, какой счёт вам подойдёт',
				'Спросить о комиссиях и картах',
				'Объяснить, каких документов пока нет',
			],
		}),
		trainedSkills: localized({
			en: 'Answer a bank’s questions about yourself and understand account terms',
			ru: 'Отвечать на вопросы банка о себе и разбираться в условиях счёта',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has recently moved to a new country and has come to a bank branch to open an account. You play the bank employee at the desk, with a consistent personality. Greet them, ask what they need and gather the information a bank typically requires, such as identity documents, address, employment and the purpose of the account, one or two questions at a time. Explain account types, fees and cards when asked. If something is missing, explain realistic options. Do not invent the participant's answers or open the account without their agreement. Stay in character.",
		),
	},
	{
		slug: 'apartment-viewing',
		groupSlug: 'immigration',
		title: localized({
			en: 'Apartment Viewing',
			ru: 'Просмотр квартиры',
		}),
		description: localized({
			en: 'You have come to view an apartment. The landlord shows you around, asks about your job and income and talks about the deposit and the contract.',
			ru: 'Вы пришли посмотреть квартиру. Арендодатель показывает её, спрашивает о работе и доходе и говорит о залоге и договоре.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: an apartment in an old building, the landlady is elderly and very picky',
			ru: 'Например: квартира в старом доме, хозяйка — пожилая и очень придирчивая',
		}),
		conversationIdeas: localizedList({
			en: [
				'Ask about the apartment and the bills',
				'Tell the landlord about yourself to make a good impression',
				'Negotiate the rent or the deposit',
			],
			ru: [
				'Расспросить о квартире и счетах',
				'Рассказать о себе, чтобы понравиться хозяину',
				'Поторговаться о цене или залоге',
			],
		}),
		trainedSkills: localized({
			en: 'View a home, ask about the rental and negotiate the terms',
			ru: 'Осматривать жильё, задавать вопросы об аренде и договариваться об условиях',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has recently moved to a new country and has come to view an apartment for rent. You play the landlord, with a consistent personality and a believable apartment. Open the door, show them around and answer questions about the apartment, the building, bills and the neighbourhood. As landlords do, ask about their job, income and lifestyle, and discuss the rent, deposit and contract terms. Decide whether you want them as a tenant based on the conversation. Do not invent the participant's answers or accept terms for them. Stay in character.",
		),
	},
	{
		slug: 'government-office',
		groupSlug: 'immigration',
		title: localized({
			en: 'At a Government Office',
			ru: 'Госучреждение',
		}),
		description: localized({
			en: 'You are at a government office counter to register your address, apply for a residence permit or get a tax number.',
			ru: 'Вы у окна госучреждения: оформляете регистрацию, вид на жительство или налоговый номер.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I’m applying for a residence permit, and the official is strict and always in a hurry',
			ru: 'Например: оформляю вид на жительство, а чиновница строгая и всё время торопится',
		}),
		conversationIdeas: localizedList({
			en: [
				'Explain what you need to apply for',
				'Ask again when something is unclear',
				'Find out what to do if a document is missing',
			],
			ru: [
				'Объяснить, что вам нужно оформить',
				'Переспросить, если что-то непонятно',
				'Узнать, что делать, если не хватает документа',
			],
		}),
		trainedSkills: localized({
			en: 'Understand official language, clarify requirements and get through red tape',
			ru: 'Понимать канцелярский язык, уточнять требования и не теряться в бюрократии',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has recently moved to a new country and is at the counter of a government office. You play the official behind the counter, with a consistent personality. Greet them and ask what they need: the participant may want to register their address, apply for a residence permit, get a tax number or something similar. Ask for the documents and details such an office would typically require, explain the procedure in the manner of a real office and answer questions. Do not invent the participant's documents or answers. Stay in character.",
		),
	},
	{
		slug: 'enrolling-child-in-school',
		groupSlug: 'immigration',
		title: localized({
			en: 'Enrolling Your Child at School',
			ru: 'Запись ребёнка в школу',
		}),
		description: localized({
			en: 'You have come to enrol your child at a local school. The school secretary asks about your child and the documents.',
			ru: 'Вы пришли записать ребёнка в местную школу. Секретарь расспрашивает о ребёнке и документах.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: my son is eight and hardly speaks the local language',
			ru: 'Например: сыну восемь лет, он почти не знает местного языка',
		}),
		conversationIdeas: localizedList({
			en: [
				'Tell them about your child and their previous school',
				'Ask about language support',
				'Ask about the timetable, lunches and clubs',
			],
			ru: [
				'Рассказать о ребёнке и его прежней школе',
				'Спросить о помощи с языком',
				'Узнать о расписании, обедах и кружках',
			],
		}),
		trainedSkills: localized({
			en: 'Talk about your child and ask about school rules',
			ru: 'Рассказывать о ребёнке и расспрашивать о школьных порядках',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has recently moved to a new country with their child and has come to a local school to enrol them. You play the school secretary, with a consistent personality. Greet them and ask how you can help. Ask about the child, such as age, previous schooling, languages and health or special needs, and about the documents a school would typically require, one or two questions at a time. Explain how the school works when asked. Let the participant describe the child; do not invent the child's details. Stay in character.",
		),
	},
	{
		slug: 'fast-food-job-interview',
		groupSlug: 'immigration',
		title: localized({
			en: 'Job Interview at McDonald’s',
			ru: 'Собеседование в McDonald’s',
		}),
		description: localized({
			en: 'You have come for a job interview at McDonald’s. The restaurant manager asks about your experience, your availability and why you want to work there.',
			ru: 'Вы пришли на собеседование в McDonald’s. Менеджер ресторана расспрашивает об опыте, графике и о том, почему вы хотите у них работать.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I have no experience but can work night shifts',
			ru: 'Например: у меня нет опыта, но могу работать по ночам',
		}),
		conversationIdeas: localizedList({
			en: [
				'Talk about yourself and your experience',
				'Discuss shifts and your availability',
				'Ask about pay and training',
			],
			ru: ['Рассказать о себе и своём опыте', 'Обсудить график и смены', 'Спросить о зарплате и обучении'],
		}),
		trainedSkills: localized({
			en: 'Get through a job interview: talk about yourself and agree on a schedule',
			ru: 'Проходить собеседование: рассказывать о себе и договариваться о графике',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has recently moved to a new country and has come for a job interview at a McDonald's restaurant. You play the restaurant manager conducting the interview, with a consistent personality. Greet them and run a typical fast-food job interview: ask about their background and experience, availability for shifts, teamwork, coping with busy times and why they want the job, one or two questions at a time. Answer their questions about the job, training and pay. Decide whether to offer the job based on the conversation. Do not invent the participant's answers. Stay in character.",
		),
	},
	{
		slug: 'doctor-appointment',
		groupSlug: 'immigration',
		title: localized({
			en: 'Seeing a Doctor',
			ru: 'Приём у врача',
		}),
		description: localized({
			en: 'You are seeing a doctor in your new country for the first time. The doctor asks what is bothering you.',
			ru: 'Вы впервые пришли к врачу в новой стране. Врач спрашивает, на что вы жалуетесь.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I’ve had a sore throat for three days, and the doctor is in a hurry',
			ru: 'Например: третий день болит горло, а врач торопится',
		}),
		conversationIdeas: localizedList({
			en: [
				'Describe your symptoms and when they started',
				'Mention chronic conditions and medication',
				'Ask about treatment and insurance',
			],
			ru: [
				'Описать симптомы и когда они начались',
				'Рассказать о хронических болезнях и лекарствах',
				'Расспросить о лечении и страховке',
			],
		}),
		trainedSkills: localized({
			en: 'Describe how you feel and understand a doctor’s advice',
			ru: 'Описывать самочувствие и понимать советы врача',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has recently moved to a new country and is seeing a general practitioner for the first time. You play the doctor, with a consistent personality. Greet them and ask what brings them in. Let the participant describe their own complaint and ask follow-up questions about symptoms, duration, medical history, medication and allergies, one or two at a time. Explain your assessment and recommendations as a doctor would to a patient, and answer questions about treatment or the local healthcare system. Do not invent the participant's symptoms. Stay in character.",
		),
	},
	{
		slug: 'meeting-the-neighbors',
		groupSlug: 'immigration',
		title: localized({
			en: 'Meeting the Neighbours',
			ru: 'Знакомство с соседями',
		}),
		description: localized({
			en: 'You have just moved into a new apartment. A neighbour on your landing strikes up a conversation with the newcomer.',
			ru: 'Вы только что въехали в новую квартиру. Сосед по лестничной клетке заговаривает с новичком.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: my neighbour is a curious pensioner who knows everything about the building',
			ru: 'Например: соседка — любопытная пенсионерка, которая знает всё о доме',
		}),
		conversationIdeas: localizedList({
			en: [
				'Introduce yourself and say a little about yourself',
				'Ask about the building and the area',
				'Invite your neighbour round for tea',
			],
			ru: ['Представиться и рассказать о себе', 'Расспросить о доме и районе', 'Пригласить соседа на чай'],
		}),
		trainedSkills: localized({
			en: 'Introduce yourself and build good relations with neighbours',
			ru: 'Знакомиться, рассказывать о себе и налаживать добрососедские отношения',
		}),
		systemPrompt: withImmigrationCountryRule(
			"The participant has just moved into an apartment in a new country. On the landing, a neighbour notices the newcomer and starts a conversation. You play this neighbour, with a consistent personality, a history in the building and opinions about the building and the area. Introduce yourself, show natural curiosity about the participant and share local knowledge when it comes up. Respond to their questions, jokes and invitations as a real neighbour would, with your own boundaries. Do not invent the participant's background. Stay in character.",
		),
	},
	{
		slug: 'first-day-at-new-job',
		groupSlug: 'immigration',
		title: localized({
			en: 'First Day at a New Job',
			ru: 'Первый день на работе',
		}),
		description: localized({
			en: 'It’s your first day at your new job. A colleague meets you and shows you around.',
			ru: 'Ваш первый день на новой работе. Коллега встречает вас и всё показывает.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I’m a programmer at a small startup',
			ru: 'Например: я программист в небольшом стартапе',
		}),
		conversationIdeas: localizedList({
			en: ['Introduce yourself', 'Ask about the rules and customs at work', 'Ask for help with your first task'],
			ru: [
				'Познакомиться и рассказать о себе',
				'Расспросить о правилах и традициях',
				'Попросить помочь с первой задачей',
			],
		}),
		trainedSkills: localized({
			en: 'Meet colleagues and learn how things work in a new workplace',
			ru: 'Знакомиться с коллегами и разбираться в порядках на новом месте',
		}),
		systemPrompt: withImmigrationCountryRule(
			"It is the participant's first day at a new job in the country they have moved to. A colleague meets them and starts showing them around the workplace. You play this colleague, with a consistent personality. The kind of company and job comes from the participant's wishes; if none is given, choose an ordinary office. Introduce yourself, show the participant around and talk about colleagues, routines and unwritten rules as they come up. You decide what happens during the day and let the participant react and make their own choices. Do not invent the participant's skills or background. Stay in character.",
		),
	},
]
