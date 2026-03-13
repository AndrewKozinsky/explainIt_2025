import './SummaryOfTheMedia.scss'

type SummaryOfTheMediaProps = {
	text: string
}

export function SummaryOfTheMedia(props: SummaryOfTheMediaProps) {
	const { text } = props

	const paragraphs = text.split(/\r?\n+/).filter((paragraph) => paragraph.trim().length)

	return (
		<div className='summary-of-the-media'>
			{paragraphs.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}
		</div>
	)
}
