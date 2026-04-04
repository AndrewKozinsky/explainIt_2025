import { Query, Resolver } from '@nestjs/graphql'
import { languages } from 'utils/languages'
import RouteNames from 'infrastructure/routeNames'
import { LanguageOutModel } from 'models/language/language.out.model'
import { languageResolversDesc } from './resolverDescriptions'

@Resolver()
export class LanguageResolver {
	@Query(() => [LanguageOutModel], {
		name: RouteNames.LANGUAGE.GET_ALL,
		description: languageResolversDesc.getLanguages,
	})
	async getLanguages() {
		return Object.values(languages)
	}
}
