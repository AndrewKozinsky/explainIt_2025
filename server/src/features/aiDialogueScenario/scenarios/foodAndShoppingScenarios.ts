import { AiDialogueScenarioSeedData, localized } from '../common'

export const foodAndShoppingScenarios: AiDialogueScenarioSeedData[] = [
	{
		slug: 'ordering-at-a-cafe',
		groupSlug: 'food-and-shopping',
		title: localized({
			en: 'Ordering at a café',
			es: 'Pedir en una cafetería',
			fr: 'Commander au café',
			de: 'Im Café bestellen',
			it: 'Ordinare al bar',
			tr: 'Kafede sipariş',
			ru: 'Заказ в кафе',
		}),
		description: localized({
			en: 'You sit down at a café. A waiter comes over to take your order.',
			es: 'Te sientas en una cafetería. Un camarero se acerca para tomar tu pedido.',
			fr: 'Vous vous installez dans un café. Un serveur vient prendre votre commande.',
			de: 'Sie nehmen in einem Café Platz. Eine Bedienung kommt, um Ihre Bestellung aufzunehmen.',
			it: 'Ti siedi in un bar. Un cameriere si avvicina per prendere l’ordinazione.',
			tr: 'Bir kafede oturuyorsunuz. Bir garson siparişinizi almak için yanınıza geliyor.',
			ru: 'Вы садитесь за столик в кафе. Официант подходит принять ваш заказ.',
		}),
		systemPrompt:
			'The participant is seated at a table in a café. You play a waiter with a consistent personality. Approach, greet them and ask what they would like. Invent a small believable selection of drinks and snacks, explaining choices or prices only when relevant. Handle requests, preferences and small talk naturally. Do not choose or order for the participant, assume allergies, or jump straight to payment. Let the encounter develop from their contributions and stay in character.',
	},
	{
		slug: 'dish-ingredients',
		groupSlug: 'food-and-shopping',
		title: localized({
			en: 'Asking about ingredients',
			es: 'Preguntar por los ingredientes',
			fr: 'Se renseigner sur les ingrédients',
			de: 'Nach Zutaten fragen',
			it: 'Chiedere gli ingredienti',
			tr: 'Yemeğin içeriğini sormak',
			ru: 'Уточнение состава блюда',
		}),
		description: localized({
			en: 'You want to know what a dish contains. You ask a restaurant waiter about its ingredients.',
			es: 'Quieres saber qué lleva un plato. Preguntas al camarero por sus ingredientes.',
			fr: 'Vous voulez savoir ce que contient un plat. Vous interrogez le serveur sur ses ingrédients.',
			de: 'Sie möchten wissen, was in einem Gericht enthalten ist. Sie fragen die Bedienung nach den Zutaten.',
			it: 'Vuoi sapere cosa contiene un piatto. Chiedi al cameriere quali sono gli ingredienti.',
			tr: 'Bir yemeğin içinde ne olduğunu öğrenmek istiyorsunuz. Garsona malzemelerini soruyorsunuz.',
			ru: 'Вы хотите узнать, из чего приготовлено блюдо, и спрашиваете официанта о составе.',
		}),
		systemPrompt:
			'The participant is at a restaurant table and wants to ask about a dish and its ingredients. You play the waiter. Greet them and ask how you can help. Establish a plausible dish if the participant has not specified one, keeping its ingredients consistent. Discuss preparation, substitutions and dietary preferences when asked. Do not invent an allergy for the participant. If asked about allergen safety, offer to check with the kitchen rather than guessing or making an unsupported guarantee. Keep this an ordinary in-character restaurant conversation, and let the participant decide what to order.',
	},
	{
		slug: 'buying-clothes',
		groupSlug: 'food-and-shopping',
		title: localized({
			en: 'Buying clothes',
			es: 'Comprar ropa',
			fr: 'Acheter des vêtements',
			de: 'Kleidung kaufen',
			it: 'Comprare vestiti',
			tr: 'Kıyafet alışverişi',
			ru: 'Покупка одежды',
		}),
		description: localized({
			en: 'You browse a clothing shop and ask a shop assistant about sizes, colours and trying things on.',
			es: 'Miras ropa en una tienda y preguntas por las tallas, los colores y los probadores.',
			fr: 'Vous regardez les vêtements en boutique et demandez de l’aide pour les tailles, les couleurs et les essayages.',
			de: 'Sie sehen sich in einem Bekleidungsgeschäft um und fragen nach Größen, Farben und Anprobemöglichkeiten.',
			it: 'Guardi i vestiti in un negozio e chiedi aiuto per taglie, colori e camerini.',
			tr: 'Bir giyim mağazasında bedenler, renkler ve kıyafetleri denemek hakkında görevliye sorular soruyorsunuz.',
			ru: 'Вы выбираете одежду в магазине и спрашиваете консультанта о размерах, цветах и примерке.',
		}),
		systemPrompt:
			'The participant is browsing a clothing shop. You play a shop assistant with a consistent personality. Greet them and offer help without assuming what they want to buy. Respond to their preferences about garments, sizes, colours, budget and fitting rooms. Invent plausible stock and prices when needed, and keep those details consistent. Allow casual conversation as circumstances permit. Do not narrate trying on or purchasing clothes on their behalf. Let the participant make their own choices and stay in character.',
	},
	{
		slug: 'returning-an-item',
		groupSlug: 'food-and-shopping',
		title: localized({
			en: 'Returning an item',
			es: 'Devolver un producto',
			fr: 'Retourner un article',
			de: 'Eine Ware zurückgeben',
			it: 'Restituire un articolo',
			tr: 'Ürün iadesi',
			ru: 'Возврат товара',
		}),
		description: localized({
			en: 'You bring an item back to a shop and discuss a return or exchange with an assistant.',
			es: 'Llevas un producto a la tienda y hablas con el dependiente sobre una devolución o un cambio.',
			fr: 'Vous rapportez un article en magasin et discutez d’un retour ou d’un échange avec un employé.',
			de: 'Sie bringen eine Ware ins Geschäft zurück und besprechen eine Rückgabe oder einen Umtausch.',
			it: 'Riporti un articolo in negozio e parli con un commesso di un reso o di un cambio.',
			tr: 'Bir ürünü mağazaya geri getiriyor ve görevliyle iade veya değişim hakkında konuşuyorsunuz.',
			ru: 'Вы приносите товар обратно в магазин и обсуждаете с продавцом возврат или обмен.',
		}),
		systemPrompt:
			'The participant is at a shop service counter with an item they want to return or exchange. You play a sales assistant. Greet them and ask how you can help, letting them explain what the item is and why they brought it back. Ask relevant questions about the receipt, purchase and condition, one or two at a time. Use a believable fictional shop policy, clearly tied to this shop, without presenting it as a universal law. Discuss available solutions without assuming their agreement or completing a refund on their behalf. Stay in character and respond naturally.',
	},
	{
		slug: 'shopping-at-a-market',
		groupSlug: 'food-and-shopping',
		title: localized({
			en: 'Shopping at a market',
			es: 'Comprar en el mercado',
			fr: 'Faire ses achats au marché',
			de: 'Auf dem Markt einkaufen',
			it: 'Fare acquisti al mercato',
			tr: 'Pazarda alışveriş',
			ru: 'Покупка на рынке',
		}),
		description: localized({
			en: 'You stop at a market stall to choose fruit or vegetables and ask the vendor about prices.',
			es: 'Te acercas a un puesto del mercado para elegir fruta o verdura y preguntar los precios.',
			fr: 'Vous vous arrêtez à un étal pour choisir des fruits ou des légumes et demander les prix.',
			de: 'Sie bleiben an einem Marktstand stehen, um Obst oder Gemüse auszuwählen und nach Preisen zu fragen.',
			it: 'Ti fermi a un banco del mercato per scegliere frutta o verdura e chiedere i prezzi.',
			tr: 'Meyve veya sebze seçmek ve fiyatları sormak için pazardaki bir tezgâha yaklaşıyorsunuz.',
			ru: 'Вы останавливаетесь у рыночного прилавка, чтобы выбрать фрукты или овощи и узнать цены.',
		}),
		systemPrompt:
			'The participant is standing at a fruit and vegetable stall in an outdoor market. You play the vendor, with a consistent personality and a small believable selection of seasonal produce. Greet them and ask what they are looking for. Discuss freshness, taste, prices, quantities, weighing or payment as the conversation develops. Keep stock and prices consistent, and handle bargaining in a way appropriate to the vendor. Do not decide what the participant buys, invent their payment or pack an order they have not agreed to. Stay in character.',
	},
]
