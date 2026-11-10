'use client'

import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import UnderlinedInput from '@/shared/ui/formRelated/UnderlinedInput/UnderlinedInput'
import './YouTubeSearch.scss'

type YouTubeSearchBarProps = {
	query: string
	onQueryChange: (value: string) => void
	onSearch: () => void
	loading: boolean
}

function YouTubeSearch(props: YouTubeSearchBarProps) {
	const { query, onQueryChange, onSearch, loading } = props

	const isEmptyQuery = !query.trim()
	const isSearchDisabled = isEmptyQuery || loading

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && !isSearchDisabled) {
			onSearch()
		}
	}

	return (
		<div className='youtube-search'>
			<div className='youtube-search__input'>
				<UnderlinedInput
					inputProps={{
						value: query,
						onChange: function (e) {
							onQueryChange(e.target.value)
						},
						onKeyDown: handleKeyDown,
						placeholder: 'Название или адрес видео на youtube.com',
						autoFocus: true,
					}}
				/>
			</div>
			<Button theme='outline' size='big' onClick={() => onSearch()} disabled={isSearchDisabled} loading={loading}>
				Найти
			</Button>
		</div>
	)
}

export default YouTubeSearch
