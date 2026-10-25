import { AiDialogueScenarioGroupSeedData, localized } from './common'

export const aiDialogueScenarioGroups: AiDialogueScenarioGroupSeedData[] = [
	{
		slug: 'travel-abroad',
		title: localized({
			en: 'Travel abroad',
			es: 'Viajar al extranjero',
			fr: 'Voyager à l’étranger',
			de: 'Reisen ins Ausland',
			it: 'Viaggiare all’estero',
			tr: 'Yurt dışı seyahati',
			ru: 'Поездка за границу',
		}),
	},
	{
		slug: 'food-and-shopping',
		title: localized({
			en: 'Food and shopping',
			es: 'Comida y compras',
			fr: 'Repas et achats',
			de: 'Essen und Einkaufen',
			it: 'Cibo e acquisti',
			tr: 'Yemek ve alışveriş',
			ru: 'Еда и покупки',
		}),
	},
	{
		slug: 'city-and-services',
		title: localized({
			en: 'City and services',
			es: 'Ciudad y servicios',
			fr: 'Ville et services',
			de: 'Stadt und Dienstleistungen',
			it: 'Città e servizi',
			tr: 'Şehir ve hizmetler',
			ru: 'Город и услуги',
		}),
	},
	{
		slug: 'home-and-everyday-life',
		title: localized({
			en: 'Home and everyday life',
			es: 'Hogar y vida cotidiana',
			fr: 'Maison et vie quotidienne',
			de: 'Zuhause und Alltag',
			it: 'Casa e vita quotidiana',
			tr: 'Ev ve günlük yaşam',
			ru: 'Дом и повседневная жизнь',
		}),
	},
]
