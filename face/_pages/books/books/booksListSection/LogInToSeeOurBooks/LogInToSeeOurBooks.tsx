import Link from 'next/link'
import { pageUrls } from 'сonsts/pageUrls'

function LogInToSeeOurBooks() {
	return (
		<p>
			<Link href={pageUrls.auth.login.path} className='link'>
				Войдите
			</Link>{' '}
			чтобы создавать и читать загруженные книги.
		</p>
	)
}

export default LogInToSeeOurBooks
