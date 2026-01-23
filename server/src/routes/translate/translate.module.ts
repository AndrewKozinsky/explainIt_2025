import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { EngRusDictionaryRepository } from 'repo/engRusDictionary.repository'
import { TranslateResolver } from 'routes/translate/translate.resolver'
import { PrismaService } from 'db/prisma.service'
// import { TranslatePhraseHandler } from 'features/translate/TranslatePhrase.command'
// import { TranslateSentenceHandler } from 'features/translate/TranslateSentence.command'

const services = [PrismaService]
// const commandHandlers = [TranslatePhraseHandler, TranslateSentenceHandler]
const resolvers = [TranslateResolver]
const repositories = [EngRusDictionaryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...resolvers, ...repositories],
})
export class TranslateRouteModule {}
