import React from 'react'
import { useCanRunTranslation } from '_pages/books/readingNext/lib/canRunTranslation'
import { translateSelectedPhrase } from '_pages/books/readingNext/lib/translateSelectedPhrase'
import Button from 'ui/formRelated/buttons/Button/Button'

function TranslateButton() {
	const isVisible = useCanRunTranslation()
	if (!isVisible) return null

	return <Button onClick={translateSelectedPhrase}>Перевести</Button>
}

export default TranslateButton
