import cn from 'classnames'
import { useWord } from './fn/useWord'
import { WordProps } from './fn/types'
import './Word.scss'

function Word(props: WordProps) {
	const { deviceType, isSelected, handlers } = useWord(props)

	return (
		<span
			className={cn('word', isSelected && 'word--selected', deviceType === 'touch' && 'no-select')}
			onMouseDown={handlers.onMouseDown}
			onMouseUp={handlers.onMouseUp}
			onMouseLeave={handlers.onMouseLeave}
			onTouchStart={handlers.onTouchStart}
			onTouchMove={handlers.onTouchMove}
			onTouchEnd={handlers.onTouchEnd}
			onTouchCancel={handlers.onTouchCancel}
			onContextMenu={(e) => e.preventDefault()}
		>
			<span
				className={cn('word__text', deviceType === 'touch' && 'no-select')}
				onContextMenu={(e) => e.preventDefault()}
			>
				{props.wordValue}
			</span>
		</span>
	)
}

export default Word
