import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalAudioPronunciationRepository } from 'repo/audioPronunciation.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateUniversalAudioPronunciationHandler } from 'features/universalAudioPronunciation/CreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { UniversalAudioPronunciationResolver } from './audioPronunciation.resolver'

const services = [PrismaService]
const commandHandlers = [CreateUniversalAudioPronunciationHandler]
const resolvers = [UniversalAudioPronunciationResolver]
const repositories = [UniversalAudioPronunciationRepository, UniversalPhraseQueryRepository, UserRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories, OptionalSessionUserGuard],
})
export class AudioPronunciationModule {}
