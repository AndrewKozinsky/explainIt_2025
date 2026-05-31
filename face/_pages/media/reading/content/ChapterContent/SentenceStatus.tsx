import Spinner from 'ui/Spinner/Spinner'

export function SentenceLoading() {
	return (
		<p className='chapter-content__sentence-loading'>
			<Spinner size='small' />
			Загрузка перевода предложения…
		</p>
	)
}
