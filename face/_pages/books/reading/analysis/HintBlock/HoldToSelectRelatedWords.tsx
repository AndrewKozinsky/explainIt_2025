import { HotKeyButton } from './details'
import { getHotKeyName } from './fn/isHoldToSelectRelatedWordsVisible'

export function HoldToSelectRelatedWords() {
	return (
		<div className='hint-block__text-block'>
			{'Зажмите '}
			<HotKeyButton text={getHotKeyName()} />
			{' для выделения связанных слов'}
		</div>
	)
}
