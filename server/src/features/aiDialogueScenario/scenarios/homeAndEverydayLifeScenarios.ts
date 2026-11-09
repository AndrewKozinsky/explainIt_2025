import { AiDialogueScenarioSeedData, localized, localizedList } from '../common'

/** Жизнь в съёмном жилье: ремонт и залог, поиск соседа, правила совместной жизни. */
export const homeAndEverydayLifeScenarios: AiDialogueScenarioSeedData[] = [
	/*{
		slug: 'landlord-repair',
		groupSlug: 'home-and-everyday-life',
		title: localized({
			en: 'The Landlady Comes to Fix It',
			es: 'La casera viene a arreglarlo',
			fr: 'La propriétaire vient réparer',
			de: 'Die Vermieterin kommt zur Reparatur',
			it: 'La padrona di casa viene a riparare',
			tr: 'Ev sahibi tamire geldi',
			ru: 'Хозяйка пришла чинить',
		}),
		description: localized({
			en: 'You told your landlady the washing machine broke. She has come to look at it and immediately hints that you must have used it wrong.',
			es: 'Le has escrito a tu casera que se ha estropeado la lavadora. Ha venido a verla y enseguida insinúa que la habrás usado mal.',
			fr: 'Vous avez écrit à votre propriétaire que le lave-linge était en panne. Elle vient voir et laisse tout de suite entendre que vous l’avez mal utilisé.',
			de: 'Sie haben Ihrer Vermieterin geschrieben, dass die Waschmaschine kaputt ist. Sie kommt nachsehen und deutet gleich an, Sie hätten sie wohl falsch bedient.',
			it: 'Hai scritto alla padrona di casa che la lavatrice si è rotta. È venuta a vederla e subito insinua che l’hai usata male.',
			tr: 'Ev sahibinize çamaşır makinesinin bozulduğunu yazdınız. Bakmaya geldi ve hemen yanlış kullandığınızı ima ediyor.',
			ru: 'Вы написали хозяйке квартиры, что сломалась стиральная машина. Она пришла посмотреть и сразу намекает, что вы, наверное, неправильно её включали.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the machine broke because it’s very old',
			es: 'Por ejemplo: la lavadora se estropeó porque es muy vieja',
			fr: 'Par exemple : la machine est tombée en panne parce qu’elle est très vieille',
			de: 'Zum Beispiel: Die Maschine ist kaputt, weil sie sehr alt ist',
			it: 'Per esempio: la lavatrice si è rotta perché è vecchissima',
			tr: 'Örneğin: makine çok eski olduğu için bozuldu',
			ru: 'Например: машина сломалась, потому что она очень старая',
		}),
		conversationIdeas: localizedList({
			en: [
				'Prove the breakdown isn’t your fault',
				'Stop her deducting the repair from your deposit',
				'Agree that she calls a repairman at her expense',
			],
			es: [
				'Demostrar que la avería no es culpa tuya',
				'Evitar que descuente la reparación de la fianza',
				'Acordar que llame a un técnico y lo pague ella',
			],
			fr: [
				'Prouver que la panne n’est pas de votre faute',
				'L’empêcher de retenir la réparation sur la caution',
				'Convenir qu’elle appelle un réparateur à ses frais',
			],
			de: [
				'Beweisen, dass der Schaden nicht Ihre Schuld ist',
				'Verhindern, dass sie die Reparatur von der Kaution abzieht',
				'Vereinbaren, dass sie auf eigene Kosten einen Handwerker holt',
			],
			it: [
				'Dimostrare che il guasto non è colpa tua',
				'Impedirle di trattenere la riparazione dalla cauzione',
				'Concordare che chiami un tecnico a sue spese',
			],
			tr: [
				'Arızanın sizin suçunuz olmadığını kanıtlamak',
				'Tamir masrafını depozitodan kesmesine engel olmak',
				'Masrafı kendisi karşılamak üzere usta çağırmasında anlaşmak',
			],
			ru: [
				'Доказать, что поломка не ваша вина',
				'Не дать вычесть ремонт из залога',
				'Договориться вызвать мастера за её счёт',
			],
		}),
		trainedSkills: localized({
			en: 'Describe a fault, argue with a landlord and stand up for yourself',
			es: 'Describir una avería, discutir con el casero y defender tus intereses',
			fr: 'Décrire une panne, discuter avec un propriétaire et défendre vos intérêts',
			de: 'Einen Defekt beschreiben, mit dem Vermieter streiten und Ihre Interessen vertreten',
			it: 'Descrivere un guasto, discutere con il proprietario e difendere i tuoi interessi',
			tr: 'Arızayı anlatmak, ev sahibiyle tartışmak ve çıkarlarınızı savunmak',
			ru: 'Описывать поломку, спорить с арендодателем и отстаивать свои интересы',
		}),
		systemPrompt:
			"The participant rents an apartment and told the landlady that the washing machine has broken. The scene opens as the participant lets her in at the front door; she wants to see the machine and suspects the participant used it wrong. Letting her in is the only predefined participant action; do not decide anything else for them. You play the landlady, with a consistent personality, a tight budget and suspicions about tenants. You decide what is actually wrong with the machine and keep it consistent. Examine it, argue about who is responsible, mention the deposit and react to the participant's arguments and proposals. Stay in character.",
	},*/
	/*{
		slug: 'move-out-inspection',
		groupSlug: 'home-and-everyday-life',
		title: localized({
			en: 'Moving Out and the Deposit',
			es: 'La mudanza y la fianza',
			fr: 'Le départ et la caution',
			de: 'Auszug und Kaution',
			it: 'Il trasloco e la cauzione',
			tr: 'Taşınma ve depozito',
			ru: 'Выезд и залог',
		}),
		description: localized({
			en: 'Moving-out day. The landlord inspects the empty apartment, finds a stain and a scratch on the floor and wants to keep part of the deposit.',
			es: 'Día de la mudanza. El casero revisa el piso vacío, encuentra una mancha y un arañazo en el suelo y quiere quedarse con parte de la fianza.',
			fr: 'Jour du départ. Le propriétaire inspecte l’appartement vide, trouve une tache et une rayure sur le sol et veut garder une partie de la caution.',
			de: 'Auszugstag. Der Vermieter prüft die leere Wohnung, findet einen Fleck und einen Kratzer im Boden und will einen Teil der Kaution behalten.',
			it: 'Il giorno del trasloco. Il proprietario controlla l’appartamento vuoto, trova una macchia e un graffio sul pavimento e vuole tenersi parte della cauzione.',
			tr: 'Taşınma günü. Ev sahibi boş daireyi inceliyor, bir leke ve yerde bir çizik buluyor ve depozitonun bir kısmını tutmak istiyor.',
			ru: 'День выезда. Хозяин осматривает пустую квартиру, находит пятно и царапину на полу и хочет оставить часть залога себе.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the scratch was there before I moved in, and I have photos',
			es: 'Por ejemplo: el arañazo ya estaba antes de entrar, y tengo fotos',
			fr: 'Par exemple : la rayure était déjà là avant mon arrivée, et j’ai des photos',
			de: 'Zum Beispiel: Der Kratzer war schon vor dem Einzug da, und ich habe Fotos',
			it: 'Per esempio: il graffio c’era già prima dell’ingresso e ho le foto',
			tr: 'Örneğin: çizik ben taşınmadan önce de vardı ve fotoğraflarım var',
			ru: 'Например: царапина была ещё до заезда, и у меня есть фото',
		}),
		conversationIdeas: localizedList({
			en: [
				'Prove the damage was there before you',
				'Agree to a partial deduction',
				'Offer to fix everything yourself',
			],
			es: [
				'Demostrar que los daños ya estaban',
				'Aceptar un descuento parcial',
				'Ofrecerte a arreglarlo todo tú',
			],
			fr: [
				'Prouver que les dégâts existaient avant vous',
				'Accepter une retenue partielle',
				'Proposer de tout réparer vous-même',
			],
			de: [
				'Beweisen, dass die Schäden schon vorher da waren',
				'Einem teilweisen Abzug zustimmen',
				'Anbieten, alles selbst zu reparieren',
			],
			it: [
				'Dimostrare che i danni c’erano già',
				'Accettare una trattenuta parziale',
				'Proporre di sistemare tutto in prima persona',
			],
			tr: [
				'Hasarların sizden önce de olduğunu kanıtlamak',
				'Kısmi kesintiyi kabul etmek',
				'Her şeyi kendiniz düzeltmeyi önermek',
			],
			ru: [
				'Доказать, что дефекты были до вас',
				'Согласиться на частичный вычет',
				'Предложить всё исправить самим',
			],
		}),
		trainedSkills: localized({
			en: 'Argue about money, refer to the contract and reach an agreement',
			es: 'Discutir sobre dinero, citar el contrato y llegar a un acuerdo',
			fr: 'Discuter d’argent, citer le bail et trouver un accord',
			de: 'Über Geld streiten, sich auf den Vertrag berufen und sich einigen',
			it: 'Discutere di soldi, citare il contratto e trovare un accordo',
			tr: 'Para konusunda tartışmak, sözleşmeye dayanmak ve anlaşmak',
			ru: 'Спорить о деньгах, ссылаться на договор и договариваться',
		}),
		systemPrompt:
			"It is moving-out day. The participant is in the empty apartment they have been renting, and the landlord is inspecting it before returning the deposit. You play the landlord, with a consistent personality. Point out a stain on a wall and a scratch on the floor and say you will keep part of the deposit. You decide what other damage you notice and keep the details consistent. React to the participant's arguments, references to the contract and offers as a real landlord would. Do not decide for the participant what they agree to. Stay in character.",
	},*/
	/*{
		slug: 'roommate-candidate',
		groupSlug: 'home-and-everyday-life',
		title: localized({
			en: 'Looking for a Flatmate',
			es: 'Buscando compañero de piso',
			fr: 'Chercher un colocataire',
			de: 'Mitbewohner gesucht',
			it: 'Cercasi coinquilino',
			tr: 'Ev arkadaşı arıyoruz',
			ru: 'Ищем соседа',
		}),
		description: localized({
			en: 'You’re looking for a flatmate. A candidate who answered your ad wants to see the room and asks what the house rules are.',
			es: 'Buscas compañero de piso. Alguien que ha respondido a tu anuncio quiere ver la habitación y pregunta por las normas de la casa.',
			fr: 'Vous cherchez un colocataire. Une personne qui a répondu à votre annonce veut voir la chambre et demande quelles sont les règles.',
			de: 'Sie suchen einen Mitbewohner. Jemand, der sich auf Ihre Anzeige gemeldet hat, möchte das Zimmer sehen und fragt nach den Hausregeln.',
			it: 'Cerchi un coinquilino. Una persona che ha risposto al tuo annuncio vuole vedere la stanza e chiede quali sono le regole di casa.',
			tr: 'Ev arkadaşı arıyorsunuz. İlanınıza başvuran biri odayı görmek istiyor ve ev kurallarını soruyor.',
			ru: 'Вы ищете соседа в квартиру. Кандидат по объявлению хочет посмотреть комнату и спрашивает, какие у вас правила.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I can’t stand smoking or loud music',
			es: 'Por ejemplo: no soporto el tabaco ni la música alta',
			fr: 'Par exemple : je ne supporte pas la cigarette ni la musique forte',
			de: 'Zum Beispiel: Ich ertrage weder Rauchen noch laute Musik',
			it: 'Per esempio: non sopporto il fumo né la musica alta',
			tr: 'Örneğin: sigaraya ve yüksek sesli müziğe dayanamam',
			ru: 'Например: я не переношу курение и громкую музыку',
		}),
		conversationIdeas: localizedList({
			en: [
				'Show the flat and ask the candidate questions',
				'Discuss the rent and the rules',
				'Say no if something worries you',
			],
			es: [
				'Enseñar el piso y hacer preguntas',
				'Hablar del alquiler y las normas',
				'Decir que no si algo te preocupa',
			],
			fr: [
				'Faire visiter et poser des questions',
				'Parler du loyer et des règles',
				'Refuser si quelque chose vous inquiète',
			],
			de: [
				'Die Wohnung zeigen und Fragen stellen',
				'Über Miete und Regeln sprechen',
				'Absagen, wenn Sie etwas beunruhigt',
			],
			it: [
				'Mostrare la casa e fare domande',
				'Parlare dell’affitto e delle regole',
				'Dire di no se qualcosa ti preoccupa',
			],
			tr: [
				'Daireyi gezdirip soru sormak',
				'Kirayı ve kuralları konuşmak',
				'Endişelendiren bir şey varsa reddetmek',
			],
			ru: [
				'Показать квартиру и расспросить кандидата',
				'Обсудить цену и правила',
				'Отказать, если что-то насторожило',
			],
		}),
		trainedSkills: localized({
			en: 'Ask questions, explain the rules and make a decision',
			es: 'Hacer preguntas, explicar las normas y tomar una decisión',
			fr: 'Poser des questions, expliquer les règles et prendre une décision',
			de: 'Fragen stellen, Regeln erklären und eine Entscheidung treffen',
			it: 'Fare domande, spiegare le regole e prendere una decisione',
			tr: 'Soru sormak, kuralları anlatmak ve karar vermek',
			ru: 'Задавать вопросы, рассказывать о правилах и принимать решение',
		}),
		systemPrompt:
			"The participant rents an apartment and is looking for a flatmate. A candidate who answered the ad arrives at the door, asks to see the room and wants to know the house rules. You play the candidate, with a consistent personality, lifestyle and habits; you decide what they reveal or keep quiet about. React to the tour and the rules, ask your own questions and negotiate the rent if it fits your character. Let the participant decide whether to accept you. Do not invent the participant's rules. Stay in character.",
	},*/
	/*{
		slug: 'dorm-roommate-rules',
		groupSlug: 'home-and-everyday-life',
		title: localized({
			en: 'A Dorm Roommate',
			es: 'Compartir habitación en la residencia',
			fr: 'Partager une chambre en résidence',
			de: 'Ein Zimmer im Wohnheim teilen',
			it: 'Dividere la stanza allo studentato',
			tr: 'Yurttaki oda arkadaşı',
			ru: 'Сосед по общежитию',
		}),
		description: localized({
			en: 'Moving-in day at the dorm. Your roommate has already unpacked and wants to set the rules straight away: lights out at ten and no guests.',
			es: 'Día de entrada en la residencia. La persona con quien compartes habitación ya ha deshecho la maleta y quiere fijar las normas enseguida: luces apagadas a las diez y nada de visitas.',
			fr: 'Jour d’arrivée en résidence. La personne qui partage votre chambre a déjà défait ses valises et veut fixer les règles tout de suite : extinction des feux à dix heures et pas d’invités.',
			de: 'Einzugstag im Wohnheim. Die Person, mit der Sie das Zimmer teilen, hat schon ausgepackt und will sofort Regeln festlegen: Licht aus um zehn und keine Gäste.',
			it: 'Giorno di arrivo allo studentato. La persona con cui dividi la stanza ha già disfatto la valigia e vuole fissare subito le regole: luci spente alle dieci e niente ospiti.',
			tr: 'Yurda taşınma günü. Oda arkadaşınız eşyalarını çoktan yerleştirmiş ve hemen kuralları belirlemek istiyor: saat onda ışıklar kapanacak ve misafir yok.',
			ru: 'День заезда в общежитие. Сосед по комнате уже распаковался и сразу предлагает договориться: отбой в десять и никаких гостей.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: I’m a night owl and often study at night',
			es: 'Por ejemplo: me acuesto tarde y a menudo estudio de noche',
			fr: 'Par exemple : je me couche tard et je travaille souvent la nuit',
			de: 'Zum Beispiel: Ich bin eine Nachteule und lerne oft nachts',
			it: 'Per esempio: vado a letto tardi e studio spesso di notte',
			tr: 'Örneğin: gece kuşuyum ve sık sık geceleri ders çalışırım',
			ru: 'Например: я сова и часто занимаюсь по ночам',
		}),
		conversationIdeas: localizedList({
			en: ['Find a compromise', 'Talk about your own habits', 'Go to the warden if you can’t agree'],
			es: [
				'Buscar un término medio',
				'Contar tus propias costumbres',
				'Ir a hablar con el responsable si no os ponéis de acuerdo',
			],
			fr: [
				'Trouver un compromis',
				'Parler de vos habitudes',
				'Aller voir le responsable de la résidence si vous n’êtes pas d’accord',
			],
			de: [
				'Einen Kompromiss finden',
				'Von Ihren eigenen Gewohnheiten erzählen',
				'Zur Wohnheimleitung gehen, wenn Sie sich nicht einigen',
			],
			it: [
				'Trovare un compromesso',
				'Raccontare le tue abitudini',
				'Andare dal responsabile se non vi mettete d’accordo',
			],
			tr: ['Orta yolu bulmak', 'Kendi alışkanlıklarınızı anlatmak', 'Anlaşamazsanız yurt müdürüne gitmek'],
			ru: ['Найти компромисс', 'Рассказать о своих привычках', 'Пойти к коменданту, если не договориться'],
		}),
		trainedSkills: localized({
			en: 'Agree on house rules and talk about your habits',
			es: 'Acordar normas de convivencia y hablar de tus costumbres',
			fr: 'Fixer des règles de vie commune et parler de vos habitudes',
			de: 'Regeln fürs Zusammenleben vereinbaren und über Ihre Gewohnheiten sprechen',
			it: 'Concordare le regole di convivenza e parlare delle tue abitudini',
			tr: 'Birlikte yaşam kurallarında anlaşmak ve alışkanlıklarınızı anlatmak',
			ru: 'Договариваться о правилах совместной жизни и рассказывать о своих привычках',
		}),
		systemPrompt:
			"It is moving-in day at a student dormitory. The participant enters their room and finds their new roommate, of the same gender as the participant, already unpacked. The roommate greets them and immediately wants to agree on rules: lights out at ten and no guests. You play the roommate, with a consistent personality and habits, and, when needed, the dorm warden. React to the participant's habits and proposals, negotiate and let the relationship develop from the conversation. Do not decide for the participant what they agree to. Stay in character.",
	},*/
]
