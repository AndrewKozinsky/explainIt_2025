import { AiDialogueScenarioSeedData, localized, localizedList } from '../common'

export const techServicesScenarios: AiDialogueScenarioSeedData[] = [
	/*{
		slug: 'phone-repair',
		groupSlug: 'tech-services',
		title: localized({
			en: 'Phone Repair',
			es: 'Reparar el móvil',
			fr: 'Réparation de téléphone',
			de: 'Handyreparatur',
			it: 'Riparazione del telefono',
			tr: 'Telefon tamiri',
			ru: 'Ремонт телефона',
		}),
		description: localized({
			en: 'You took your phone in for repair. The technician holds it in pieces: not only the screen but the board needs replacing, and it will cost three times as much.',
			es: 'Has dejado el móvil para reparar. El técnico lo tiene desmontado: no solo hay que cambiar la pantalla, también la placa, y costará el triple.',
			fr: 'Vous avez donné votre téléphone à réparer. Le réparateur le tient démonté : il faut changer non seulement l’écran mais aussi la carte mère, et ça coûtera trois fois plus cher.',
			de: 'Sie haben Ihr Handy zur Reparatur gebracht. Der Techniker hält es zerlegt in der Hand: Nicht nur das Display, auch die Platine muss ersetzt werden, und es kostet dreimal so viel.',
			it: 'Hai portato il telefono a riparare. Il tecnico lo tiene smontato: non bisogna cambiare solo lo schermo, ma anche la scheda, e costerà il triplo.',
			tr: 'Telefonunuzu tamire verdiniz. Usta onu sökülmüş hâlde tutuyor: sadece ekran değil, anakart da değişmeli ve üç katı tutacak.',
			ru: 'Вы отдали телефон в ремонт. Мастер держит его разобранным: менять нужно не только экран, но и плату, и выйдет в три раза дороже.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: The technician explains which fault can wait and which needs fixing now',
			es: 'Por ejemplo: el técnico explica qué avería puede esperar y cuál hay que reparar ya',
			fr: 'Par exemple : le réparateur explique quelle panne peut attendre et laquelle doit être réparée tout de suite',
			de: 'Zum Beispiel: Der Techniker erklärt, welcher Defekt warten kann und welcher sofort behoben werden muss',
			it: 'Per esempio: il tecnico spiega quale guasto può aspettare e quale va riparato subito',
			tr: 'Örneğin: tamirci hangi arızanın bekleyebileceğini, hangisinin hemen giderilmesi gerektiğini anlatıyor',
			ru: 'Например: мастер объясняет, с какой неисправностью можно подождать, а какую нужно устранить сразу',
		}),
		conversationIdeas: localizedList({
			en: [
				'Agree to the repair',
				'Haggle and ask about the warranty',
				'Take the phone back if you suspect a scam',
			],
			es: [
				'Aceptar la reparación',
				'Regatear y preguntar por la garantía',
				'Llevarte el móvil si sospechas un engaño',
			],
			fr: [
				'Accepter la réparation',
				'Négocier et se renseigner sur la garantie',
				'Reprendre le téléphone si vous soupçonnez une arnaque',
			],
			de: [
				'Der Reparatur zustimmen',
				'Handeln und nach der Garantie fragen',
				'Das Handy wieder mitnehmen, wenn Sie Betrug vermuten',
			],
			it: [
				'Accettare la riparazione',
				'Trattare e chiedere della garanzia',
				'Riprenderti il telefono se sospetti un imbroglio',
			],
			tr: [
				'Tamiri kabul etmek',
				'Pazarlık yapıp garantiyi sormak',
				'Dolandırıcılıktan şüphelenirseniz telefonu geri almak',
			],
			ru: [
				'Согласиться на ремонт',
				'Поторговаться и спросить про гарантию',
				'Забрать телефон, если подозреваете обман',
			],
		}),
		trainedSkills: localized({
			en: 'Describe a fault, ask about the price and warranty and avoid being cheated',
			es: 'Describir una avería, preguntar por el precio y la garantía y evitar que te engañen',
			fr: 'Décrire une panne, vous renseigner sur le prix et la garantie et éviter de vous faire avoir',
			de: 'Einen Defekt beschreiben, nach Preis und Garantie fragen und sich nicht übers Ohr hauen lassen',
			it: 'Descrivere un guasto, chiedere del prezzo e della garanzia ed evitare di farti imbrogliare',
			tr: 'Arızayı anlatmak, fiyatı ve garantiyi sormak ve kandırılmamak',
			ru: 'Описывать поломку, спрашивать о цене и гарантии и не давать себя обмануть',
		}),
		systemPrompt:
			"The participant left their phone with a cracked screen at a small repair shop and has come back for it. You play the repair technician, with a consistent personality, holding the phone in pieces. Tell them the bad news: not only the screen but also the board needs replacing, and it will cost three times as much as agreed. You decide whether this is true or an attempt to overcharge, and keep it consistent. React to the participant's questions about the fault, the price and the warranty and to their decision. Do not decide for the participant what they do. Stay in character.",
	},*/
	/*{
		slug: 'damaged-delivery',
		groupSlug: 'tech-services',
		title: localized({
			en: 'A Damaged Parcel',
			es: 'Un paquete dañado',
			fr: 'Un colis abîmé',
			de: 'Ein beschädigtes Paket',
			it: 'Un pacco danneggiato',
			tr: 'Hasarlı paket',
			ru: 'Мятая посылка',
		}),
		description: localized({
			en: 'A courier is at your door with a dented box and asks whether you’ll accept the parcel as it is or refuse it.',
			es: 'Un repartidor está en tu puerta con una caja abollada y te pregunta si aceptas el paquete tal como está o lo rechazas.',
			fr: 'Un livreur est à votre porte avec un carton cabossé et vous demande si vous acceptez le colis en l’état ou si vous le refusez.',
			de: 'Ein Kurier steht mit einem eingedellten Karton vor Ihrer Tür und fragt, ob Sie das Paket so annehmen oder ablehnen.',
			it: 'Un corriere è alla tua porta con una scatola ammaccata e ti chiede se accetti il pacco così com’è o lo rifiuti.',
			tr: 'Kapınızda ezik bir kutuyla bir kurye var ve paketi olduğu gibi mi alacağınızı yoksa reddedecek misiniz diye soruyor.',
			ru: 'Курьер стоит у двери с помятой коробкой и спрашивает, примете ли вы посылку как есть или откажетесь.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: The courier offers to record the damage before asking for a signature',
			es: 'Por ejemplo: el mensajero propone dejar constancia de los daños antes de pedir la firma',
			fr: 'Par exemple : le livreur propose de consigner les dégâts avant de demander une signature',
			de: 'Zum Beispiel: Der Kurier bietet an, den Schaden festzuhalten, bevor er um eine Unterschrift bittet',
			it: 'Per esempio: il corriere propone di annotare i danni prima di chiedere la firma',
			tr: 'Örneğin: kurye imza istemeden önce hasarı kayda geçirmeyi öneriyor',
			ru: 'Например: курьер предлагает внести описание повреждений в отчёт о доставке, прежде чем просить подпись',
		}),
		conversationIdeas: localizedList({
			en: [
				'Accept it and photograph the damage',
				'Refuse the parcel',
				'Ask the courier to write up a damage report',
			],
			es: [
				'Aceptarlo y fotografiar los daños',
				'Rechazar el paquete',
				'Pedir al repartidor que deje constancia de los daños',
			],
			fr: [
				'Accepter et photographier les dégâts',
				'Refuser le colis',
				'Demander au livreur de noter les dégâts par écrit',
			],
			de: [
				'Annehmen und die Schäden fotografieren',
				'Das Paket ablehnen',
				'Den Kurier bitten, den Schaden zu protokollieren',
			],
			it: [
				'Accettarlo e fotografare i danni',
				'Rifiutare il pacco',
				'Chiedere al corriere di mettere per iscritto i danni',
			],
			tr: [
				'Kabul edip hasarın fotoğrafını çekmek',
				'Paketi reddetmek',
				'Kuryeden hasar tutanağı tutmasını istemek',
			],
			ru: [
				'Принять и сфотографировать повреждения',
				'Отказаться от посылки',
				'Попросить курьера составить акт о повреждении',
			],
		}),
		trainedSkills: localized({
			en: 'Describe damage and stand up for your rights as a customer',
			es: 'Describir daños y defender tus derechos como cliente',
			fr: 'Décrire des dégâts et défendre vos droits de client',
			de: 'Schäden beschreiben und Ihre Rechte als Kunde vertreten',
			it: 'Descrivere i danni e difendere i tuoi diritti di cliente',
			tr: 'Hasarları anlatmak ve müşteri haklarınızı savunmak',
			ru: 'Описывать повреждения и отстаивать свои права покупателя',
		}),
		systemPrompt:
			"The participant is at home and has just opened the front door to a courier holding a visibly dented box. The opening sceneUpdate's visual shows the open door with the participant inside and the courier outside; include the courier's npcId in participants. Opening the door is the only predefined participant action; do not decide anything else for them. You play the courier, with a consistent personality and a busy schedule. Point out the damage and ask whether they accept the parcel as it is or refuse it. React to the participant's questions and decisions, and explain the delivery company's procedure as a real courier would. Stay in character.",
	},*/
	{
		slug: 'courier-lost',
		groupSlug: 'tech-services',
		title: localized({
			en: 'A Lost Courier',
			es: 'Un repartidor perdido',
			fr: 'Un livreur perdu',
			de: 'Ein Kurier findet die Adresse nicht',
			it: 'Un corriere che si è perso',
			tr: 'Kaybolan kurye',
			ru: 'Курьер не может найти дом',
		}),
		description: localized({
			en: 'You step out into the courtyard and see a confused courier with a parcel: he is looking for building 12 and can’t find entrance three.',
			es: 'Sales al patio y ves a un repartidor desorientado con un paquete: busca el edificio 12 y no encuentra el portal tres.',
			fr: 'Vous sortez dans la cour et voyez un livreur désorienté avec un colis : il cherche le bâtiment 12 et ne trouve pas l’entrée trois.',
			de: 'Sie gehen in den Hof und sehen einen ratlosen Kurier mit einem Paket: Er sucht Haus 12 und findet den Eingang drei nicht.',
			it: 'Esci in cortile e vedi un corriere disorientato con un pacco: cerca il palazzo 12 e non trova la scala tre.',
			tr: 'Avluya çıkıyorsunuz ve elinde paketle şaşkın bir kurye görüyorsunuz: 12 numaralı binayı arıyor ve üçüncü girişi bulamıyor.',
			ru: 'Вы выходите во двор и видите растерянного курьера с посылкой: он ищет дом 12 и никак не найдёт третий подъезд.',
		}),
		userScenarioAmendmentHint: localized({
			en: 'For example: The courier says the navigation app led to the wrong courtyard and asks how to recognise the right entrance',
			es: 'Por ejemplo: el mensajero dice que el navegador lo llevó al patio equivocado y pregunta cómo reconocer el portal correcto',
			fr: 'Par exemple : le livreur dit que son GPS l’a mené dans la mauvaise cour et demande comment reconnaître la bonne entrée',
			de: 'Zum Beispiel: Der Kurier sagt, dass ihn das Navi in den falschen Hof geführt hat, und fragt, woran er den richtigen Eingang erkennt',
			it: 'Per esempio: il corriere dice che il navigatore lo ha mandato nel cortile sbagliato e chiede come riconoscere l’ingresso giusto',
			tr: 'Örneğin: kurye navigasyonun kendisini yanlış avluya götürdüğünü söylüyor ve doğru girişi nasıl tanıyacağını soruyor',
			ru: 'Например: курьер говорит, что навигатор привёл его в соседний двор, и спрашивает, как узнать нужный подъезд',
		}),
		conversationIdeas: localizedList({
			en: ['Give directions using landmarks', 'Walk him to the entrance', 'Help sort out a wrong address'],
			es: [
				'Indicar el camino con puntos de referencia',
				'Acompañarle hasta el portal',
				'Ayudar a aclarar una dirección equivocada',
			],
			fr: [
				'Indiquer le chemin avec des repères',
				'L’accompagner jusqu’à l’entrée',
				'Aider à régler une erreur d’adresse',
			],
			de: [
				'Den Weg anhand von Orientierungspunkten erklären',
				'Ihn zum Eingang begleiten',
				'Bei einer falschen Adresse helfen',
			],
			it: [
				'Indicare la strada con punti di riferimento',
				'Accompagnarlo fino all’ingresso',
				'Aiutare a risolvere un indirizzo sbagliato',
			],
			tr: [
				'Yer işaretleriyle yol tarif etmek',
				'Onu girişe kadar götürmek',
				'Yanlış adres sorununu çözmeye yardım etmek',
			],
			ru: ['Объяснить дорогу по ориентирам', 'Проводить до подъезда', 'Помочь разобраться с неверным адресом'],
		}),
		trainedSkills: localized({
			en: 'Give directions and describe the surroundings',
			es: 'Indicar el camino y describir el entorno',
			fr: 'Indiquer le chemin et décrire les lieux',
			de: 'Den Weg erklären und die Umgebung beschreiben',
			it: 'Indicare la strada e descrivere i dintorni',
			tr: 'Yol tarif etmek ve çevreyi anlatmak',
			ru: 'Объяснять дорогу и описывать местность',
		}),
		systemPrompt:
			"The participant steps out into the courtyard of their apartment block and sees a confused courier, a man, with a parcel. He asks whether they know where building 12 is, saying he cannot find entrance three. You play the courier, with a consistent personality and a busy schedule. You decide the layout of the courtyard and the details of the address and keep them consistent. React to the participant's directions and help. Do not decide for the participant what they do. Stay in character.",
	},
]
