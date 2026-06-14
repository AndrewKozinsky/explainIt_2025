import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalAudioPronunciationRepository } from 'repo/universalPhraseAudio.repository'
import { UserRepository } from 'repo/user.repository'
import { UniversalAudioPronunciationResolver } from 'routes/universalPhraseAudio/universalPhraseAudio.resolver'
import { PrismaService } from 'db/prisma.service'
import { CreateUniversalAudioPronunciationHandler } from 'features/universalAudioPronunciation/CreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'

const services = [PrismaService]
const commandHandlers = [CreateUniversalAudioPronunciationHandler]
const resolvers = [UniversalAudioPronunciationResolver]
const repositories = [UniversalAudioPronunciationRepository, UniversalPhraseQueryRepository, UserRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories, OptionalSessionUserGuard],
})
export class UniversalPhraseAudioModule {}
