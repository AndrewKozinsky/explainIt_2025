import { AiDialogueScenarioSeedData } from '../common'

export const studyScenarios: AiDialogueScenarioSeedData[] = [
	/*{
		slug: 'placement-interview',
		groupSlug: 'study',
		title: localized({
			en: 'Language Placement Interview',
			es: 'Prueba de nivel',
			fr: 'Test de niveau',
			de: 'Einstufungsgespräch',
			it: 'Test di livello',
			tr: 'Seviye tespit görüşmesi',
			ru: 'Тест на уровень языка',
		}),
		description: localized({
			en: 'A language school. A teacher with a questionnaire wants to find out your level and asks you to talk about yourself.',
			es: 'Una academia de idiomas. Un profesor con un cuestionario quiere saber tu nivel y te pide que hables de ti.',
			fr: 'Une école de langues. Un professeur avec un questionnaire veut déterminer votre niveau et vous demande de parler de vous.',
			de: 'Eine Sprachschule. Eine Lehrkraft mit einem Fragebogen möchte Ihr Niveau feststellen und bittet Sie, von sich zu erzählen.',
			it: 'Una scuola di lingue. Un insegnante con un questionario vuole capire il tuo livello e ti chiede di parlare di te.',
			tr: 'Bir dil okulu. Elinde bir anketle öğretmen seviyenizi belirlemek istiyor ve kendinizden bahsetmenizi istiyor.',
			ru: 'Языковая школа. Преподаватель с анкетой хочет определить ваш уровень и просит рассказать о себе.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I want to join the advanced group, although my level is only intermediate',
			es: 'Por ejemplo: quiero entrar en el grupo avanzado, aunque mi nivel todavía es intermedio',
			fr: 'Par exemple : je veux aller dans le groupe avancé, même si mon niveau est encore intermédiaire',
			de: 'Zum Beispiel: Ich möchte in den Fortgeschrittenenkurs, obwohl mein Niveau noch mittel ist',
			it: 'Per esempio: voglio entrare nel gruppo avanzato, anche se il mio livello è ancora intermedio',
			tr: 'Örneğin: seviyem henüz orta olsa da ileri gruba girmek istiyorum',
			ru: 'Например: я хочу в продвинутую группу, хотя мой уровень пока средний',
		}),
		conversationIdeas: localizedList({
			en: [
				'Explain why you need the language',
				'Argue if they put you in a group that’s too easy',
				'Discuss the timetable and the price',
			],
			es: [
				'Explicar para qué necesitas el idioma',
				'Protestar si te ponen en un grupo demasiado fácil',
				'Hablar del horario y el precio',
			],
			fr: [
				'Expliquer pourquoi vous avez besoin de la langue',
				'Protester si on vous met dans un groupe trop facile',
				'Parler des horaires et du prix',
			],
			de: [
				'Erklären, wofür Sie die Sprache brauchen',
				'Widersprechen, wenn man Sie in einen zu leichten Kurs steckt',
				'Über Stundenplan und Preis sprechen',
			],
			it: [
				'Spiegare a cosa ti serve la lingua',
				'Protestare se ti mettono in un gruppo troppo facile',
				'Parlare di orari e prezzo',
			],
			tr: [
				'Dile neden ihtiyacınız olduğunu anlatmak',
				'Çok kolay bir gruba yazılırsanız itiraz etmek',
				'Ders saatlerini ve ücreti konuşmak',
			],
			ru: [
				'Рассказать, зачем вам язык',
				'Поспорить, если записывают в слишком лёгкую группу',
				'Обсудить расписание и цену',
			],
		}),
		trainedSkills: localized({
			en: 'Talk about yourself and your goals and arrange your studies',
			es: 'Hablar de ti y de tus objetivos y organizar tus estudios',
			fr: 'Parler de vous et de vos objectifs et organiser vos cours',
			de: 'Über sich und Ihre Ziele sprechen und den Unterricht vereinbaren',
			it: 'Parlare di te e dei tuoi obiettivi e organizzare lo studio',
			tr: 'Kendinizi ve hedeflerinizi anlatmak ve eğitiminizi planlamak',
			ru: 'Рассказывать о себе и своих целях и договариваться об обучении',
		}),
		systemPrompt:
			"The participant has come to a language school to sign up for a course in the dialogue language. You play the teacher who runs the placement interview, with a consistent personality and a questionnaire. Ask the participant to talk about themselves and why they need the language, and gradually make your questions a little more demanding to find their level. Based on how they actually speak in this conversation, suggest a group, and discuss the timetable and the price when asked. React to disagreement about the level as a real teacher would. Do not invent the participant's answers. Stay in character.",
	},*/
	/*{
		slug: 'missed-class',
		groupSlug: 'study',
		title: localized({
			en: 'Missed Classes',
			es: 'Clases perdidas',
			fr: 'Des cours manqués',
			de: 'Verpasster Unterricht',
			it: 'Lezioni perse',
			tr: 'Kaçırılan dersler',
			ru: 'Пропущенные занятия',
		}),
		description: localized({
			en: 'You have missed a lot of classes and finally show up. The teacher asks where you have been all this time.',
			es: 'Has faltado a muchas clases y por fin vuelves. El profesor te pregunta dónde has estado todo este tiempo.',
			fr: 'Vous avez manqué beaucoup de cours et revenez enfin. Le professeur vous demande où vous étiez pendant tout ce temps.',
			de: 'Sie haben viel Unterricht verpasst und kommen endlich wieder. Die Lehrkraft fragt, wo Sie die ganze Zeit waren.',
			it: 'Hai perso molte lezioni e finalmente torni. L’insegnante ti chiede che fine hai fatto in tutto questo tempo.',
			tr: 'Pek çok dersi kaçırdınız ve sonunda derse geldiniz. Öğretmen bunca zamandır nerede olduğunuzu soruyor.',
			ru: 'Вы пропустили много занятий и наконец пришли на урок. Преподаватель спрашивает, где вы были всё это время.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I was ill, but I don’t have a doctor’s note',
			es: 'Por ejemplo: falté por enfermedad, pero no tengo justificante',
			fr: 'Par exemple : j’ai manqué pour cause de maladie, mais je n’ai pas de certificat',
			de: 'Zum Beispiel: Ich habe wegen Krankheit gefehlt, aber kein Attest',
			it: 'Per esempio: le lezioni sono saltate per malattia, ma non ho il certificato',
			tr: 'Örneğin: hastalık yüzünden kaçırdım ama raporum yok',
			ru: 'Например: занятия пропущены из-за болезни, но справки нет',
		}),
		conversationIdeas: localizedList({
			en: [
				'Explain why and apologise',
				'Ask for the materials and homework',
				'Agree on how to catch up with the group',
			],
			es: [
				'Explicar el motivo y pedir perdón',
				'Pedir los materiales y los deberes',
				'Acordar cómo ponerte al día',
			],
			fr: [
				'Expliquer la raison et vous excuser',
				'Demander les supports et les devoirs',
				'Convenir de la façon de rattraper le groupe',
			],
			de: [
				'Den Grund erklären und sich entschuldigen',
				'Nach Unterlagen und Hausaufgaben fragen',
				'Vereinbaren, wie Sie den Stoff nachholen',
			],
			it: [
				'Spiegare il motivo e chiedere scusa',
				'Chiedere i materiali e i compiti',
				'Concordare come rimetterti in pari',
			],
			tr: [
				'Nedenini açıklayıp özür dilemek',
				'Ders materyallerini ve ödevleri istemek',
				'Gruba nasıl yetişeceğinizde anlaşmak',
			],
			ru: ['Объяснить причину и извиниться', 'Попросить материалы и задания', 'Договориться, как догнать группу'],
		}),
		trainedSkills: localized({
			en: 'Explain reasons, apologise and agree on how to catch up',
			es: 'Explicar motivos, pedir perdón y acordar cómo recuperar lo perdido',
			fr: 'Expliquer vos raisons, vous excuser et convenir de la façon de rattraper le retard',
			de: 'Gründe erklären, sich entschuldigen und vereinbaren, wie Sie alles nachholen',
			it: 'Spiegare i motivi, chiedere scusa e concordare come recuperare',
			tr: 'Nedenleri açıklamak, özür dilemek ve eksikleri nasıl kapatacağınızda anlaşmak',
			ru: 'Объяснять причины, извиняться и договариваться о том, как всё наверстать',
		}),
		systemPrompt:
			'The participant is a student on a course who has missed many classes and has finally come back. The scene opens as they enter the classroom and the teacher notices them and asks where they have been all this time. You play the teacher, with a consistent personality, and, when needed, classmates. The participant decides why they were absent; do not invent it for them. React to their explanation, discuss what they missed and how to catch up, and decide on any consequences as a real teacher would. Stay in character.',
	},*/
	/*{
		slug: 'tutor-first-lesson',
		groupSlug: 'study',
		title: localized({
			en: 'First Lesson with a Tutor',
			es: 'Primera clase con un profesor particular',
			fr: 'Premier cours avec un professeur particulier',
			de: 'Erste Stunde mit einem Nachhilfelehrer',
			it: 'Prima lezione con un insegnante privato',
			tr: 'Özel öğretmenle ilk ders',
			ru: 'Первое занятие с репетитором',
		}),
		description: localized({
			en: 'Your first lesson with a tutor. They switch off their phone and ask what you find hardest about the language.',
			es: 'Tu primera clase con un profesor particular. Apaga el móvil y te pregunta qué es lo que más te cuesta del idioma.',
			fr: 'Votre premier cours avec un professeur particulier. Il éteint son téléphone et vous demande ce qui vous pose le plus de difficultés dans la langue.',
			de: 'Ihre erste Stunde bei einem Nachhilfelehrer. Er schaltet das Handy aus und fragt, was Ihnen an der Sprache am schwersten fällt.',
			it: 'La tua prima lezione con un insegnante privato. Spegne il telefono e ti chiede cosa trovi più difficile nella lingua.',
			tr: 'Özel öğretmenle ilk dersiniz. Telefonunu kapatıyor ve dilde en çok neyi zor bulduğunuzu soruyor.',
			ru: 'Первое занятие с репетитором. Он выключает телефон и просит рассказать, что вам в языке даётся труднее всего.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I find it hard to understand fast speech',
			es: 'Por ejemplo: me cuesta entender cuando hablan rápido',
			fr: 'Par exemple : j’ai du mal à comprendre quand on parle vite',
			de: 'Zum Beispiel: Schnelles Sprechen verstehe ich schwer',
			it: 'Per esempio: faccio fatica a capire quando si parla in fretta',
			tr: 'Örneğin: hızlı konuşulunca anlamakta zorlanıyorum',
			ru: 'Например: мне трудно понимать на слух быструю речь',
		}),
		conversationIdeas: localizedList({
			en: ['Describe your weak spots', 'Show a piece of writing to be checked', 'Agree on homework'],
			es: ['Describir tus puntos débiles', 'Enseñar un texto escrito para que lo revise', 'Acordar los deberes'],
			fr: ['Décrire vos points faibles', 'Montrer un écrit à corriger', 'Convenir des devoirs'],
			de: [
				'Ihre Schwächen beschreiben',
				'Einen geschriebenen Text zur Durchsicht zeigen',
				'Hausaufgaben vereinbaren',
			],
			it: ['Descrivere i tuoi punti deboli', 'Mostrare un testo scritto da controllare', 'Concordare i compiti'],
			tr: ['Zayıf yönlerinizi anlatmak', 'Kontrol için yazılı bir çalışma göstermek', 'Ödevlerde anlaşmak'],
			ru: [
				'Описать свои слабые места',
				'Показать письменную работу на проверку',
				'Договориться о домашних заданиях',
			],
		}),
		trainedSkills: localized({
			en: 'Talk about your difficulties and goals in learning',
			es: 'Hablar de tus dificultades y objetivos al aprender',
			fr: 'Parler de vos difficultés et de vos objectifs d’apprentissage',
			de: 'Über Ihre Schwierigkeiten und Lernziele sprechen',
			it: 'Parlare delle tue difficoltà e dei tuoi obiettivi di studio',
			tr: 'Öğrenmedeki zorluklarınızı ve hedeflerinizi anlatmak',
			ru: 'Рассказывать о своих трудностях и целях в учёбе',
		}),
		systemPrompt:
			"The participant is having their first lesson with a private tutor of the dialogue language. You play the tutor, with a consistent personality and teaching style. Switch off your phone and ask what the participant finds hardest about the language, then ask about their goals, previous studies and available time. Suggest a plan, react to the participant's wishes and discuss homework and the schedule. If the participant shows you some written work, comment on it in general terms as part of the conversation. Do not invent the participant's difficulties or goals. Stay in character.",
	},*/
]
