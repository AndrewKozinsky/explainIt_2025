import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UniversalPhraseAudioQueryRepository } from 'repo/universalPhrase/universalPhraseAudio.queryRepository'
import { UniversalPhraseAudioRepository } from 'repo/universalPhrase/universalPhraseAudio.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { GetOrCreateUniversalPhraseAudioHandler } from 'features/universalPhraseAudio/GetOrCreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { UniversalPhraseAudioController } from './universalPhraseAudio.controller'

const services = [PrismaService]
const commandHandlers = [GetOrCreateUniversalPhraseAudioHandler]
const repositories = [
	UniversalPhraseAudioRepository,
	UniversalPhraseQueryRepository,
	UniversalPhraseAudioQueryRepository,
	UserRepository,
]

@Module({
	imports: [CqrsModule],
	controllers: [UniversalPhraseAudioController],
	providers: [...services, ...commandHandlers, ...repositories, OptionalSessionUserGuard],
})
export class UniversalPhraseAudioModule {}
