import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalPhraseAudioQueryRepository } from 'repo/universalPhraseAudio.queryRepository'
import { UniversalPhraseAudioRepository } from 'repo/universalPhraseAudio.repository'
import { UserRepository } from 'repo/user.repository'
import { UniversalPhraseAudioResolver } from 'routes/universalPhraseAudio/universalPhraseAudio.resolver'
import { PrismaService } from 'db/prisma.service'
import { GetOrCreateUniversalPhraseAudioHandler } from 'features/universalPhraseAudio/CreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'

const services = [PrismaService]
const commandHandlers = [GetOrCreateUniversalPhraseAudioHandler]
const resolvers = [UniversalPhraseAudioResolver]
const repositories = [
	UniversalPhraseAudioRepository,
	UniversalPhraseQueryRepository,
	UniversalPhraseAudioQueryRepository,
	UserRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories, OptionalSessionUserGuard],
})
export class UniversalPhraseAudioModule {}
