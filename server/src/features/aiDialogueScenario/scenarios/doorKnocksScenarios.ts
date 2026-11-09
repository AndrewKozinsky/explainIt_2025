import { AiDialogueScenarioSeedData, localized, localizedList } from '../common'

/**
 * Добавляет перед промптом общую завязку группы: стук в дверь, участник открывает и видит гостя снаружи.
 * Открытие двери — единственное заданное действие участника; кадр показывает уже открытую дверь.
 */
function withDoorOpening(visitorPrompt: string): string {
	return `The participant is at home in their own apartment. The predefined opening is: someone knocks at the front door, the participant opens it and sees the visitor outside. Narrate this brief sequence in the opening sceneUpdate without waiting for a separate participant action to open the door. The opening sceneUpdate's visual must depict the final moment of this sequence: the door is already open, the participant remains inside their apartment at the threshold, and the visitor is visible outside. Include the visible visitor's npcId in participants. Opening the door is the only predefined participant action; do not invent further speech, decisions, invitations or consent for them. ${visitorPrompt}`
}

export const doorKnocksScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'knock-at-the-door',
		groupSlug: 'door-knocks',
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
	/*{
		slug: 'plumber-visit',
		groupSlug: 'door-knocks',
		title: localized({
			en: 'The Plumber Is Here',
			es: 'Llega el fontanero',
			fr: 'Le plombier est là',
			de: 'Der Klempner ist da',
			it: 'È arrivato l’idraulico',
			tr: 'Tesisatçı geldi',
			ru: 'Сантехник по вызову',
		}),
		description: localized({
			en: 'A plumber with a toolbox is at your door: they have come about a call-out and ask where the leak is.',
			es: 'Un fontanero con su caja de herramientas está en tu puerta: dice que viene por un aviso y pregunta dónde está la fuga.',
			fr: 'Un plombier avec sa caisse à outils est à votre porte : il vient pour une intervention et demande où est la fuite.',
			de: 'Ein Klempner mit Werkzeugkoffer steht vor der Tür: Er kommt wegen eines Auftrags und fragt, wo es undicht ist.',
			it: 'Alla porta c’è un idraulico con la cassetta degli attrezzi: dice di essere venuto per una chiamata e chiede dove c’è la perdita.',
			tr: 'Kapıda alet çantasıyla bir tesisatçı var: çağrı üzerine geldiğini söylüyor ve nereden su kaçırdığını soruyor.',
			ru: 'На пороге мастер с инструментами: он пришёл по вызову и спрашивает, где течёт.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: nobody called a plumber',
			es: 'Por ejemplo: nadie ha llamado al fontanero',
			fr: 'Par exemple : personne n’a appelé de plombier',
			de: 'Zum Beispiel: Niemand hat einen Klempner gerufen',
			it: 'Per esempio: nessuno ha chiamato l’idraulico',
			tr: 'Örneğin: kimse tesisatçı çağırmadı',
			ru: 'Например: сантехника никто не вызывал',
		}),
		conversationIdeas: localizedList({
			en: ['Explain what is broken', 'Ask about the price before the work starts', 'Turn down the service'],
			es: ['Explicar qué se ha roto', 'Preguntar el precio antes de empezar', 'Rechazar el servicio'],
			fr: ['Expliquer ce qui est cassé', 'Demander le prix avant le début des travaux', 'Refuser l’intervention'],
			de: ['Erklären, was kaputt ist', 'Vor Arbeitsbeginn nach dem Preis fragen', 'Die Leistung ablehnen'],
			it: ['Spiegare cosa si è rotto', 'Chiedere il prezzo prima di iniziare', 'Rifiutare il servizio'],
			tr: ['Neyin bozulduğunu anlatmak', 'İşe başlamadan fiyatı sormak', 'Hizmeti reddetmek'],
			ru: ['Рассказать, что сломалось', 'Уточнить цену до начала работы', 'Отказаться от услуг'],
		}),
		trainedSkills: localized({
			en: 'Describe a fault, agree on a price and say no politely',
			es: 'Describir una avería, acordar un precio y decir que no con educación',
			fr: 'Décrire une panne, convenir d’un prix et refuser poliment',
			de: 'Einen Schaden beschreiben, einen Preis vereinbaren und höflich ablehnen',
			it: 'Descrivere un guasto, concordare un prezzo e rifiutare con gentilezza',
			tr: 'Arızayı anlatmak, fiyatta anlaşmak ve kibarca reddetmek',
			ru: 'Описывать поломку, договариваться о цене и вежливо отказываться',
		}),
		systemPrompt: withDoorOpening(
			"The visitor is a plumber with a toolbox who says they have come about a call-out and asks where the leak is. You play the plumber, with a consistent personality. Whether the participant actually called a plumber and whether anything is broken is up to the participant; adapt to what they say. Discuss the problem, the work and the price when they come up, and respect the participant's decision if they turn down the service. Stay in character.",
		),
	},*/
	/*{
		slug: 'neighbors-cat-on-balcony',
		groupSlug: 'door-knocks',
		title: localized({
			en: 'A Cat on Your Balcony',
			es: 'Una gata en tu balcón',
			fr: 'Une chatte sur votre balcon',
			de: 'Eine Katze auf dem Balkon',
			it: 'Una gatta sul balcone',
			tr: 'Balkondaki kedi',
			ru: 'Кошка на балконе',
		}),
		description: localized({
			en: 'Your downstairs neighbour is at the door: her cat has jumped onto your balcony.',
			es: 'En la puerta está la vecina de abajo: su gata ha saltado a tu balcón.',
			fr: 'Votre voisine du dessous est à la porte : sa chatte a sauté sur votre balcon.',
			de: 'Die Nachbarin von unten steht vor der Tür: Ihre Katze ist auf Ihren Balkon gesprungen.',
			it: 'Alla porta c’è la vicina del piano di sotto: la sua gatta è saltata sul tuo balcone.',
			tr: 'Kapıda alt kattaki komşunuz var: kedisi sizin balkonunuza atlamış.',
			ru: 'На пороге соседка снизу: её кошка перепрыгнула к вам на балкон.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the cat is timid and won’t let anyone pick it up',
			es: 'Por ejemplo: la gata es asustadiza y no se deja coger',
			fr: 'Par exemple : la chatte est craintive et ne se laisse pas attraper',
			de: 'Zum Beispiel: Die Katze ist scheu und lässt sich nicht hochnehmen',
			it: 'Per esempio: la gatta è paurosa e non si lascia prendere',
			tr: 'Örneğin: kedi ürkek ve kucağa alınmak istemiyor',
			ru: 'Например: кошка пугливая и не даётся в руки',
		}),
		conversationIdeas: localizedList({
			en: ['Invite the neighbour in', 'Promise to bring the cat down', 'Get to know your neighbour better'],
			es: ['Invitar a la vecina a pasar', 'Prometer bajarle la gata', 'Conocer mejor a la vecina'],
			fr: [
				'Inviter la voisine à entrer',
				'Promettre de lui ramener sa chatte',
				'Faire plus ample connaissance avec la voisine',
			],
			de: [
				'Die Nachbarin hereinbitten',
				'Versprechen, die Katze hinunterzubringen',
				'Die Nachbarin besser kennenlernen',
			],
			it: ['Invitare la vicina a entrare', 'Promettere di riportarle la gatta', 'Conoscere meglio la vicina'],
			tr: [
				'Komşuyu içeri davet etmek',
				'Kediyi aşağı getireceğinize söz vermek',
				'Komşunuzu daha yakından tanımak',
			],
			ru: ['Пригласить соседку войти', 'Пообещать вынести кошку', 'Познакомиться с соседкой поближе'],
		}),
		trainedSkills: localized({
			en: 'Talk to neighbours, invite someone in and offer help',
			es: 'Hablar con los vecinos, invitar a alguien a casa y ofrecer ayuda',
			fr: 'Parler avec vos voisins, inviter quelqu’un chez vous et proposer votre aide',
			de: 'Mit Nachbarn reden, jemanden hereinbitten und Hilfe anbieten',
			it: 'Parlare con i vicini, invitare qualcuno in casa e offrire aiuto',
			tr: 'Komşularla konuşmak, birini eve davet etmek ve yardım teklif etmek',
			ru: 'Разговаривать с соседями, приглашать в дом и предлагать помощь',
		}),
		systemPrompt: withDoorOpening(
			"The visitor is the participant's downstairs neighbour, a woman whose cat has jumped onto the participant's balcony. She is worried and asks for help getting the cat back. You play the neighbour, with a consistent personality, and you also describe the cat's behaviour when it matters. Respond to whatever the participant suggests, such as inviting you in or fetching the cat themselves. Do not decide for the participant whether they let you in. Stay in character.",
		),
	},*/
	/*{
		slug: 'leak-from-upstairs',
		groupSlug: 'door-knocks',
		title: localized({
			en: 'A Leak from Upstairs',
			es: 'Una fuga desde arriba',
			fr: 'Une fuite chez le voisin du dessus',
			de: 'Wasserschaden von oben',
			it: 'Allagamento dal piano di sopra',
			tr: 'Üst kattan su sızıntısı',
			ru: 'Потоп сверху',
		}),
		description: localized({
			en: 'Water is pouring through your ceiling. You go upstairs to your neighbour, who opens the door.',
			es: 'Te cae agua del techo. Subes a ver al vecino de arriba y te abre la puerta.',
			fr: 'De l’eau coule de votre plafond. Vous montez chez le voisin du dessus, qui vous ouvre.',
			de: 'Bei Ihnen tropft Wasser von der Decke. Sie gehen zum Nachbarn nach oben, und er öffnet die Tür.',
			it: 'Dal soffitto ti cola acqua. Sali dal vicino di sopra, che ti apre la porta.',
			tr: 'Tavanınızdan su akıyor. Üst kattaki komşuya çıkıyorsunuz ve o kapıyı açıyor.',
			ru: 'У вас с потолка льёт вода. Вы поднимаетесь к соседу сверху, и он открывает дверь.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: the neighbour insists everything is dry at his place',
			es: 'Por ejemplo: el vecino jura que en su casa todo está seco',
			fr: 'Par exemple : le voisin assure que tout est sec chez lui',
			de: 'Zum Beispiel: Der Nachbar beteuert, bei ihm sei alles trocken',
			it: 'Per esempio: il vicino giura che da lui è tutto asciutto',
			tr: 'Örneğin: komşu evinde her yerin kuru olduğunda ısrar ediyor',
			ru: 'Например: сосед уверяет, что у него всё сухо',
		}),
		conversationIdeas: localizedList({
			en: [
				'Explain what happened and ask them to check the pipes',
				'Suggest finding the source of the leak together',
				'Agree on who pays for the repairs',
			],
			es: [
				'Explicar qué ha pasado y pedirle que revise las tuberías',
				'Proponer buscar juntos de dónde sale el agua',
				'Acordar quién paga las reparaciones',
			],
			fr: [
				'Expliquer ce qui se passe et lui demander de vérifier les tuyaux',
				'Proposer de chercher ensemble l’origine de la fuite',
				'Convenir de qui paiera les réparations',
			],
			de: [
				'Erklären, was passiert ist, und bitten, die Leitungen zu prüfen',
				'Vorschlagen, gemeinsam nach der Ursache zu suchen',
				'Klären, wer die Reparatur bezahlt',
			],
			it: [
				'Spiegare cosa è successo e chiedere di controllare i tubi',
				'Proporre di cercare insieme da dove arriva l’acqua',
				'Mettersi d’accordo su chi paga i lavori',
			],
			tr: [
				'Ne olduğunu anlatıp boruları kontrol etmesini istemek',
				'Suyun nereden geldiğini birlikte bulmayı önermek',
				'Tamir masrafını kimin ödeyeceğinde anlaşmak',
			],
			ru: [
				'Объяснить, что случилось, и попросить проверить трубы',
				'Предложить вместе найти, откуда течёт',
				'Договориться, кто заплатит за ремонт',
			],
		}),
		trainedSkills: localized({
			en: 'Explain a problem, insist on fixing it and agree on compensation',
			es: 'Explicar un problema, exigir que se solucione y acordar una compensación',
			fr: 'Expliquer un problème, exiger qu’il soit réglé et convenir d’un dédommagement',
			de: 'Ein Problem schildern, auf eine Lösung bestehen und Schadenersatz vereinbaren',
			it: 'Spiegare un problema, pretendere che venga risolto e concordare un risarcimento',
			tr: 'Sorunu anlatmak, çözülmesini istemek ve zararın karşılanmasında anlaşmak',
			ru: 'Объяснять проблему, добиваться её решения и договариваться о возмещении ущерба',
		}),
		systemPrompt:
			"Water is leaking through the ceiling of the participant's apartment. The predefined opening is: the participant goes up to the apartment above and knocks, and the upstairs neighbour opens the door, puzzled, asking what has happened. Narrate this brief sequence in the opening sceneUpdate without waiting for separate participant actions. The opening sceneUpdate's visual must depict the final moment: the participant stands on the landing outside the open door and the neighbour is visible in the doorway. Include the neighbour's npcId in participants. Going upstairs and knocking are the only predefined participant actions; do not invent further speech, decisions or consent for them. You play the upstairs neighbour, with a consistent personality. You decide whether you know about the leak and what is causing it. React realistically to the participant's words, whether apologetic, defensive or helpful. Stay in character.",
	},*/
	/*{
		slug: 'noise-complaint',
		groupSlug: 'door-knocks',
		title: localized({
			en: 'A Noise Complaint',
			es: 'Quejas por el ruido',
			fr: 'Plainte pour bruit',
			de: 'Beschwerde wegen Lärm',
			it: 'Lamentela per il rumore',
			tr: 'Gürültü şikâyeti',
			ru: 'Жалоба на шум',
		}),
		description: localized({
			en: 'An annoyed neighbour is at your door: there’s too much noise coming from your flat.',
			es: 'En tu puerta hay un vecino enfadado: sale demasiado ruido de tu piso.',
			fr: 'Un voisin mécontent est à votre porte : il y a trop de bruit chez vous.',
			de: 'Ein verärgerter Nachbar steht vor der Tür: Aus Ihrer Wohnung kommt zu viel Lärm.',
			it: 'Alla porta c’è un vicino arrabbiato: da casa tua arriva troppo rumore.',
			tr: 'Kapıda kızgın bir komşu var: dairenizden çok fazla gürültü geliyor.',
			ru: 'На пороге недовольный сосед: из вашей квартиры слишком шумно.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: it’s my birthday and I have friends over',
			es: 'Por ejemplo: es mi cumpleaños y tengo amigos en casa',
			fr: 'Par exemple : c’est mon anniversaire, et j’ai des amis à la maison',
			de: 'Zum Beispiel: Ich habe Geburtstag, und Freunde sind zu Besuch',
			it: 'Per esempio: è il mio compleanno e ho degli amici a casa',
			tr: 'Örneğin: doğum günüm ve evde arkadaşlarım var',
			ru: 'Например: у меня день рождения, в гостях друзья',
		}),
		conversationIdeas: localizedList({
			en: [
				'Apologise and promise to keep it down',
				'Explain where the noise comes from',
				'Invite the neighbour to join you',
			],
			es: [
				'Pedir perdón y prometer hacer menos ruido',
				'Explicar de dónde viene el ruido',
				'Invitar al vecino a unirse',
			],
			fr: [
				'Vous excuser et promettre de faire moins de bruit',
				'Expliquer d’où vient le bruit',
				'Inviter le voisin à se joindre à vous',
			],
			de: [
				'Sich entschuldigen und versprechen, leiser zu sein',
				'Erklären, woher der Lärm kommt',
				'Den Nachbarn einladen mitzufeiern',
			],
			it: [
				'Chiedere scusa e promettere di fare meno rumore',
				'Spiegare da dove arriva il rumore',
				'Invitare il vicino a unirsi',
			],
			tr: [
				'Özür dileyip daha sessiz olacağınıza söz vermek',
				'Gürültünün nereden geldiğini açıklamak',
				'Komşuyu size katılmaya davet etmek',
			],
			ru: ['Извиниться и пообещать вести себя тише', 'Объяснить, откуда шум', 'Пригласить соседа присоединиться'],
		}),
		trainedSkills: localized({
			en: 'Apologise, explain yourself and settle a dispute with neighbours',
			es: 'Pedir perdón, explicarte y resolver un conflicto con los vecinos',
			fr: 'Vous excuser, vous expliquer et régler un conflit avec les voisins',
			de: 'Sich entschuldigen, sich erklären und einen Streit mit Nachbarn beilegen',
			it: 'Chiedere scusa, spiegarti e risolvere un conflitto con i vicini',
			tr: 'Özür dilemek, kendinizi açıklamak ve komşularla anlaşmazlığı çözmek',
			ru: 'Извиняться, объясняться и улаживать конфликт с соседями',
		}),
		systemPrompt: withDoorOpening(
			"The visitor is a neighbour who is annoyed by noise coming from the participant's apartment. You play the neighbour, with a consistent personality and your own reason for being bothered right now. Complain about the noise naturally. The participant decides what the noise is and why; do not invent it for them. React realistically to their apologies, explanations or invitations: calm down, insist or get angrier depending on what they say. Stay in character.",
		),
	},*/
	/*{
		slug: 'police-looking-for-witnesses',
		groupSlug: 'door-knocks',
		title: localized({
			en: 'The Police Are Looking for Witnesses',
			es: 'La policía busca testigos',
			fr: 'La police cherche des témoins',
			de: 'Die Polizei sucht Zeugen',
			it: 'La polizia cerca testimoni',
			tr: 'Polis tanık arıyor',
			ru: 'Полиция ищет свидетелей',
		}),
		description: localized({
			en: 'A police officer knocks at your door and asks whether you saw anything last night.',
			es: 'Un policía llama a tu puerta y te pregunta si viste algo anoche.',
			fr: 'Un policier frappe à votre porte et vous demande si vous avez vu quelque chose hier soir.',
			de: 'Ein Polizist klopft an Ihre Tür und fragt, ob Sie gestern Abend etwas bemerkt haben.',
			it: 'Un poliziotto bussa alla tua porta e ti chiede se ieri sera hai visto qualcosa.',
			tr: 'Bir polis kapınızı çalıyor ve dün akşam bir şey görüp görmediğinizi soruyor.',
			ru: 'В дверь стучит полицейский: он спрашивает, не видели ли вы чего-нибудь вчера вечером.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: an apartment in our building was burgled yesterday',
			es: 'Por ejemplo: ayer robaron en un piso de nuestro edificio',
			fr: 'Par exemple : un appartement de notre immeuble a été cambriolé hier',
			de: 'Zum Beispiel: Gestern wurde in eine Wohnung in unserem Haus eingebrochen',
			it: 'Per esempio: ieri hanno svaligiato un appartamento nel nostro palazzo',
			tr: 'Örneğin: dün binamızdaki bir daire soyuldu',
			ru: 'Например: вчера в нашем доме ограбили квартиру',
		}),
		conversationIdeas: localizedList({
			en: ['Tell them what you saw or heard', 'Ask what happened', 'Ask to see their ID'],
			es: ['Contar lo que viste u oíste', 'Preguntar qué ha pasado', 'Pedirle que te enseñe la placa'],
			fr: [
				'Raconter ce que vous avez vu ou entendu',
				'Demander ce qui s’est passé',
				'Demander à voir sa carte de police',
			],
			de: [
				'Erzählen, was Sie gesehen oder gehört haben',
				'Fragen, was passiert ist',
				'Um den Dienstausweis bitten',
			],
			it: ['Raccontare cosa hai visto o sentito', 'Chiedere cosa è successo', 'Chiedere di vedere il distintivo'],
			tr: [
				'Gördüklerinizi ya da duyduklarınızı anlatmak',
				'Ne olduğunu sormak',
				'Kimliğini göstermesini istemek',
			],
			ru: [
				'Рассказать, что видели или слышали',
				'Расспросить, что случилось',
				'Попросить показать удостоверение',
			],
		}),
		trainedSkills: localized({
			en: 'Describe events, people and times and answer police questions',
			es: 'Describir hechos, personas y horas y responder a las preguntas de la policía',
			fr: 'Décrire des faits, des personnes et des horaires et répondre aux questions de la police',
			de: 'Ereignisse, Personen und Uhrzeiten beschreiben und Fragen der Polizei beantworten',
			it: 'Descrivere fatti, persone e orari e rispondere alle domande della polizia',
			tr: 'Olayları, kişileri ve saatleri anlatmak ve polisin sorularını yanıtlamak',
			ru: 'Описывать события, людей и время и отвечать на вопросы полиции',
		}),
		systemPrompt: withDoorOpening(
			'The visitor is a police officer going door to door looking for witnesses to something that happened in the building or the street last night. You play the officer, with a consistent personality. Show your badge, briefly explain why you are there and ask whether the participant saw or heard anything, then ask follow-up questions about times, people and details, one or two at a time. You decide what happened. The participant decides what they saw, if anything; do not invent their observations. Stay in character.',
		),
	},*/
]
