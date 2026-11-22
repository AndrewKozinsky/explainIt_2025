import ContentBordered from '@/shared/ui/content/ContentBordered/ContentBordered'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentList from '@/shared/ui/content/ContentList/ContentList'
import ContentText from '@/shared/ui/content/ContentText/ContentText'
import ContentWrapper from '@/shared/ui/content/ContentWrapper/ContentWrapper'
import './AiDialogueExamInfo.scss'

export default function AiDialogueExamInfo() {
	return (
		<div className='ai-dialogue-exam-info'>
			<ContentHeaderWithChildren title='Экзамен: В кафе'>
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
					<ContentText>Несколько направлений беседы если не знаете что делать:</ContentText>
					<ContentList>
						<li>Узнайте, какие блюда и напитки есть в меню.</li>
						<li>Попросите рекомендацию и объясните свои предпочтения.</li>
						<li>Уточните состав блюда или попросите заменить ингредиент.</li>
						<li>Сделайте заказ и обсудите возникшую проблему.</li>
						<li>Попросите счёт и уточните способы оплаты.</li>
					</ContentList>
					<ContentText>Вы можете выбрать собственную тему.</ContentText>
				</ContentWrapper>
			</ContentHeaderWithChildren>
		</div>
	)
}
