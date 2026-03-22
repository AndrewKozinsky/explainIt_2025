import Header from 'ui/Header/Header'
import { useGetPageHeader } from './fn/useGetPageHeader'

function ReadingHeader() {
	return <Header>{useGetPageHeader()}</Header>
}

export default ReadingHeader
