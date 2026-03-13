import Header from 'ui/Header/Header'
import { useGetPageHeader } from './fn/useGetPageHeader'

function WatchingHeader() {
	return <Header>{useGetPageHeader()}</Header>
}

export default WatchingHeader
