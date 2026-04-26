import Spinner from 'ui/Spinner/Spinner'

export function SentenceWordLoading() {
	return (
		<p className='chapter-content__word-loading'>
			<Spinner size='small' />
			Загрузка перевода слова…
		</p>
	)
}
