import React from 'react'
import Button from 'ui/formRelated/buttons/Button/Button'
import { useCanRunTranslation } from '_pages/books/reading/lib/canRunTranslation'
import { translateSelectedPhrase } from '_pages/books/reading/lib/translateSelectedPhrase'

function TranslateButton() {
	const isVisible = useCanRunTranslation()
	if (!isVisible) return null

	return <Button onClick={translateSelectedPhrase}>Перевести</Button>
}

export default TranslateButton
