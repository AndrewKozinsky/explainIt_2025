import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { EngRusDictionaryRepository } from 'repo/engRusDictionary.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { TranslateController } from 'routes/translate/translate.controller'
import { TranslateService } from 'routes/translate/translate.service'
import { PrismaService } from 'db/prisma.service'
import { StreamTranslateWithChatGPT } from 'features/translate/StreamTranslateWithChatGPT.service'
import { StreamTranslateWithYandex } from 'features/translate/StreamTranslateWithYandex.service'
import { TranslateSentenceHandler } from 'features/translate/TranslateSentence.command'

const services = [PrismaService, TranslateService]
const commandHandlers = [TranslateSentenceHandler]
const translateProviders = [StreamTranslateWithYandex, StreamTranslateWithChatGPT]
const repositories = [EngRusDictionaryRepository, SentenceTranslationRepository]

@Module({
	imports: [CqrsModule],
	controllers: [TranslateController],
	providers: [...commandHandlers, ...translateProviders, ...services, ...repositories],
})
export class TranslateRouteModule {}
