import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TranslateTextHandler } from 'src/features/translate/TranslateText.command'
import { YandexTranslateResolver } from './yandexTranslate.resolver'

const commandHandlers = [TranslateTextHandler]
const resolvers = [YandexTranslateResolver]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers],
})
export class YandexTranslateRouteModule {}
