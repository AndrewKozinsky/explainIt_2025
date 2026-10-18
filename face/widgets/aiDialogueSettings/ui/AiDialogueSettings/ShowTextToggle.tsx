import Toggle from '@/shared/ui/formRelated/Toggle/Toggle'

type ShowTextToggleProps = {
	showText: boolean
	onShowTextChange: (showText: boolean) => void
}

function ShowTextToggle({ showText, onShowTextChange }: ShowTextToggleProps) {
	return (
		<Toggle
			label='Show text'
			checked={showText}
			inputProps={{ onChange: (event) => onShowTextChange(event.target.checked) }}
		/>
	)
}

export default ShowTextToggle
