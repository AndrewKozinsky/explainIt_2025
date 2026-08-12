'use client'

// import React from 'react'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
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
			<TextInput
				inputProps={{
					value: query,
					onChange: function (e) {
						onQueryChange(e.target.value)
					},
					onKeyDown: handleKeyDown,
					placeholder: 'Поиск видео...',
				}}
			/>
			<Button theme='outline' onClick={onSearch} disabled={isSearchDisabled} loading={loading}>
				Найти
			</Button>
		</div>
	)
}

export default YouTubeSearch
