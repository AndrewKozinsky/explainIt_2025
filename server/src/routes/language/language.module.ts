import { Module } from '@nestjs/common'
import { LanguageResolver } from './language.resolver'

const resolvers = [LanguageResolver]

@Module({
	providers: [...resolvers],
})
export class LanguageModule {}
