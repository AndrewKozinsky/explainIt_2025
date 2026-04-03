import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AudioPronunciationQueryRepository } from 'repo/audioPronunciation.queryRepository'
import { AudioPronunciationRepository } from 'repo/audioPronunciation.repository'
import { VoiceRepository } from 'repo/voice.repository'
import { WordQueryRepository } from 'repo/word.queryRepository'
import { PrismaService } from 'db/prisma.service'
import { CreateAudioPronunciationHandler } from 'features/audioPronunciation/CreateAudioPronunciation.command'
import { AudioPronunciationResolver } from './audioPronunciation.resolver'

const services = [PrismaService]
const commandHandlers = [CreateAudioPronunciationHandler]
const resolvers = [AudioPronunciationResolver]
const repositories = [
	AudioPronunciationRepository,
	AudioPronunciationQueryRepository,
	VoiceRepository,
	WordQueryRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class AudioPronunciationModule {}
