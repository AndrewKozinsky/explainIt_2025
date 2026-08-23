import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'

type YouWillLosePhrasesWarningProps = {
	hasOriginalContent: boolean
}

function YouWillLosePhrasesWarning(props: YouWillLosePhrasesWarningProps) {
	const { hasOriginalContent } = props

	if (!hasOriginalContent) return null

	return <StatusBlock type='warning'>При обновлении текста главы все переводы будут потеряны.</StatusBlock>
}

export default YouWillLosePhrasesWarning
