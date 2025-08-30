import ErrorMessage from '@/ui//ErrorMessage/ErrorMessage'
import LoadingMessage from '@/ui//LoadingMessage/LoadingMessage'
import './LoadingOrErrorAnalysis.scss'

type LoadingOrErrorAnalysisProps = {
	type: 'loading' | 'error'
}

/** Блок с сообщением о загрузке данных проверки перевода или об ошибке. */
function LoadingOrErrorAnalysis(props: LoadingOrErrorAnalysisProps) {
	const { type } = props

	return (
		<div className='loading-error-analysis'>
			{type === 'error' && <ErrorMessage text='При запросе произошла ошибка.' />}
			{type === 'loading' && <LoadingMessage text='Проверка перевода' />}
		</div>
	)
}

export default LoadingOrErrorAnalysis
