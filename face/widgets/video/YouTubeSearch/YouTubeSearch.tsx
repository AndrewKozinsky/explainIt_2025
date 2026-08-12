'use client'

import { useEffect, useRef } from 'react'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
import './YouTubeSearch.scss'

type YouTubeSearchBarProps = {
	query: string
	onQueryChange: (value: string) => void
	onSearch: () => void
	loading: boolean
	autoSearch?: boolean
}

function YouTubeSearch(props: YouTubeSearchBarProps) {
	const { query, onQueryChange, onSearch, loading, autoSearch } = props

	const isEmptyQuery = !query.trim()
	const isSearchDisabled = isEmptyQuery || loading

	const onSearchRef = useRef(onSearch)
	onSearchRef.current = onSearch

	useEffect(
		function () {
			if (!autoSearch) return
			if (!query.trim()) return

			const timer = setTimeout(function () {
				onSearchRef.current()
			}, 500)

			return function () {
				clearTimeout(timer)
			}
		},
		[autoSearch, query],
	)

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && !isSearchDisabled) {
			onSearch()
		}
	}

	return (
		<div className='youtube-search'>
			<TextInput
				block
				size='big'
				inputProps={{
					value: query,
					onChange: function (e) {
						onQueryChange(e.target.value)
					},
					onKeyDown: handleKeyDown,
					placeholder: 'Название или адрес видео на youtube.com',
				}}
			/>
			<Button theme='outline' size='big' onClick={onSearch} disabled={isSearchDisabled} loading={loading}>
				Найти
			</Button>
		</div>
	)
}

export default YouTubeSearch
