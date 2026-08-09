import InfoBlock from '@/shared/ui/InfoBlock/InfoBlock'

type YouWillLosePhrasesWarningProps = {
	hasOriginalContent: boolean
}

function YouWillLosePhrasesWarning(props: YouWillLosePhrasesWarningProps) {
	const { hasOriginalContent } = props

	if (!hasOriginalContent) return null

	return <InfoBlock type='warning'>При обновлении текста главы все переводы будут потеряны.</InfoBlock>
}

export default YouWillLosePhrasesWarning
