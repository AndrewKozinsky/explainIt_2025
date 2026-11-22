import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import ContentBordered from '@/shared/ui/content/ContentBordered/ContentBordered'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentList from '@/shared/ui/content/ContentList/ContentList'
import ContentText from '@/shared/ui/content/ContentText/ContentText'
import ContentWrapper from '@/shared/ui/content/ContentWrapper/ContentWrapper'
import './AiDialogueExamInfo.scss'

type Props = {
	scenario: Pick<AiDialogueScenarioModel, 'title' | 'conversationIdeas'>
}

export default function AiDialogueExamInfo({ scenario }: Props) {
	return (
		<div className='ai-dialogue-exam-info'>
			<ContentHeaderWithChildren title={`Экзамен: ${scenario.title}`}>
				<ContentWrapper>
					<ContentText>
						Проверьте, насколько самостоятельно вы можете общаться в этом сценарии. Рекомендуется приступать
						если вы уже практиковали этот сценарий.
					</ContentText>
					<ContentText>В экзамене имитируется реальная жизнь:</ContentText>
					<ContentList>
						<li>Реплики персонажа можно только слышать, а действия читать.</li>
						<li>Перевод недоступен.</li>
						<li>Ваши ответы не исправляются после отправки.</li>
					</ContentList>
				</ContentWrapper>
			</ContentHeaderWithChildren>
			<ContentHeaderWithChildren title='Как проходит экзамен' hTag={4}>
				<ContentWrapper>
					<ContentList>
						<li>Поддерживайте разговор и давайте развёрнутые ответы чтобы продемонстрировать знания.</li>
						<li>
							Дайте как минимум 10 ответов. После становится доступна кнопка «Сдать работу». Если
							материала для оценки недостаточно, то продолжайте разговор и проверьте результат ещё раз.
						</li>
						<li>
							Если материала достаточно, то программа проверит ответы и сообщит результат. Если сдали хотя
							бы на минимальный уровень, то получите медаль для этого конкретного сценария.
						</li>
					</ContentList>
					<ContentBordered>
						<ContentText size='small'>
							После проверки вы получите рекомендации как улучшить навыки чтобы в следующий раз
							продемонстрировать более высокий уровень. Рекомендации будут не зависимо от того сдали ли вы
							экзамен или нет.
						</ContentText>
					</ContentBordered>
				</ContentWrapper>
			</ContentHeaderWithChildren>
			<ContentHeaderWithChildren title='О чём можно говорить' hTag={4}>
				<ContentWrapper>
					<ContentText>
						Самый простой вариант не выдумывать другую личность, а говорить так, как сами бы отвечали.
					</ContentText>
					{scenario.conversationIdeas.length > 0 && (
						<>
							<ContentText>Несколько направлений беседы если не знаете что делать:</ContentText>
							<ContentList>
								{scenario.conversationIdeas.map((idea, index) => (
									<li key={index}>{idea}</li>
								))}
							</ContentList>
						</>
					)}
					<ContentText>Вы можете выбрать собственную тему.</ContentText>
				</ContentWrapper>
			</ContentHeaderWithChildren>
		</div>
	)
}
