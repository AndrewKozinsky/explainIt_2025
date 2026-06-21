import GenerateSubtitlesButton from '../GenerateSubtitlesButton/GenerateSubtitlesButton'
import mainConfig from 'сonsts/mainConfig'
import './GenerateSubtitlesBlock.scss'

type GenerateSubtitlesBlockProps = {
	isFormDisabled: boolean
}

function GenerateSubtitlesBlock(props: GenerateSubtitlesBlockProps) {
	const { isFormDisabled } = props

	return (
		<div className='generate-subtitles-block'>
			{mainConfig.region === 'intl' && (
				<>
					<p>Если у вас нет субтитров, то вы можете их сгенерировать. Это расходует баланс.</p>
					<p>Сгенерировать субтитры можно для видео с длительностью не более 1 часа.</p>
					<GenerateSubtitlesButton disabled={isFormDisabled} />
				</>
			)}
			<p>
				Бесплатно сгенерировать транскрипцию для видео продолжительностью до 30 минут можно на{' '}
				<a href='https://turboscribe.ai' className='link'>
					turboscribe.ai
				</a>
				.
			</p>
		</div>
	)
}

export default GenerateSubtitlesBlock
