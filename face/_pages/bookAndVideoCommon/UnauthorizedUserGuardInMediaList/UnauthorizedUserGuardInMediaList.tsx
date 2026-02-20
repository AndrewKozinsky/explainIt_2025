import Link from 'next/link'
import { useUserStore } from 'stores/userStore'
import Button from 'ui/formRelated/buttons/Button/Button'
import './UnauthorizedUserGuardInMediaList.scss'
import { pageUrls } from 'сonsts/pageUrls'

type ContentType = 'books' | 'videos'

function UnauthorizedUserGuardInMediaList({ contentType }: { contentType: ContentType }) {
	const user = useUserStore((state) => state.user)
	const isUserLoading = useUserStore((state) => state.isLoading)

	if (isUserLoading) {
		return null
	}

	if (!user) {
		return <UnauthorizedUser contentType={contentType} />
	}

	const tariffCode = user?.currentSubscription?.tariffCode

	if (!tariffCode || tariffCode === 'base') {
		return <UserWithBasicTariff contentType={contentType} />
	}

	return null
}

export default UnauthorizedUserGuardInMediaList

function UnauthorizedUser({ contentType }: { contentType: ContentType }) {
	const text =
		contentType === 'books'
			? 'Смотреть и загружать книги могут только авторизованные пользователи со стандартной подпиской.'
			: 'Смотреть и загружать фильмы могут только авторизованные пользователи со стандартной подпиской.'

	return (
		<Wrapper>
			<Text>{text}</Text>
			<Link href={pageUrls.auth.login.path}>
				<Button>Войти</Button>
			</Link>
		</Wrapper>
	)
}

function UserWithBasicTariff({ contentType }: { contentType: ContentType }) {
	const text =
		contentType === 'books'
			? 'Смотреть и загружать книги могут только пользователи со стандартной подпиской.'
			: 'Смотреть и загружать фильмы могут только пользователи со стандартной подпиской.'

	return (
		<Wrapper>
			<Text>{text}</Text>
			<Link href={pageUrls.tariffs.path}>
				<Button>Тарифы</Button>
			</Link>
		</Wrapper>
	)
}

function Wrapper({ children }: { children: React.ReactNode }) {
	return <div className='unauthorized-user-guard-in-media-list__wrapper'>{children}</div>
}

function Text({ children }: { children: string }) {
	return <p className='unauthorized-user-guard-in-media-list__text'>{children}</p>
}
