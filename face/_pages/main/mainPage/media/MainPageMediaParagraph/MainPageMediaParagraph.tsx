import Paragraph from 'ui/Paragraph/Paragraph'

function MainPageMediaParagraph({ children }: { children: string }) {
	return (
		<Paragraph fontSize='16' lineHeight='24'>
			{children}
		</Paragraph>
	)
}

export default MainPageMediaParagraph
