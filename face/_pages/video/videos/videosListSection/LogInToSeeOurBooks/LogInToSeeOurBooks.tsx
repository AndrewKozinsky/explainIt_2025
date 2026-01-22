import Link from 'next/link'
import { pageUrls } from 'сonsts/pageUrls'

function LogInToSeeOurBooks() {
	return (
		<p>
			<Link href={pageUrls.auth.login.path} className='link'>
				Войдите
			</Link>{' '}
			чтобы посмотреть список своих видео и загрузить новые.
		</p>
	)
}

export default LogInToSeeOurBooks
