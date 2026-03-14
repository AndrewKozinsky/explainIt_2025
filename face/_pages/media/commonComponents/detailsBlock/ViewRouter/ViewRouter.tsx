import Link from 'next/link'
import Button from 'ui/formRelated/buttons/Button/Button'
import { AnalysisBlock } from '../AnalysisBlock/AnalysisBlock'
import { useDetailsStore } from '../detailsStore'
import { pageUrls } from 'сonsts/pageUrls'
import './ViewRouter.scss'

function ViewRouter() {
	const viewType = useDetailsStore((store) => store.viewType)

	if (viewType === 'CAN_CREATE') {
		return <CanCreateView />
	}
	if (viewType === 'LOGIN_REQUIRED') {
		return <LoginRequiredView />
	}
	if (viewType === 'LOGIN_AND_SUBSCRIPTION_REQUIRED') {
		return <LoginAndSubscriptionRequiredView />
	}
	if (viewType === 'SUBSCRIPTION_REQUIRED') {
		return <SubscriptionRequiredView />
	} else if (viewType === 'BALANCE_REQUIRED') {
		return <BalanceRequiredView />
	}

	return <AnalysisBlock />
}

export default ViewRouter

function CanCreateView() {
	return (
		<InfoWrapper>
			<InfoText>Нажмите на слово для перевода и анализа предложения.</InfoText>
		</InfoWrapper>
	)
}

function LoginRequiredView() {
	return (
		<InfoWrapper>
			<InfoText>
				Это слово и предложение ещё не переведено. Запрашивать новый перевод могут только авторизованные
				пользователи.
			</InfoText>
			<Link href={pageUrls.auth.login.path}>
				<Button>Войти</Button>
			</Link>
		</InfoWrapper>
	)
}

function LoginAndSubscriptionRequiredView() {
	return (
		<InfoWrapper>
			<InfoText>
				Перевод и анализ этого текста могут делать только авторизованные пользователи с базовой или стандартной
				подпиской.
			</InfoText>
			<Link href={pageUrls.auth.login.path}>
				<Button>Войти</Button>
			</Link>
		</InfoWrapper>
	)
}

function SubscriptionRequiredView() {
	return (
		<InfoWrapper>
			<InfoText>
				Перевод и анализ этого текста могут делать пользователи с базовой или стандартной подпиской.
			</InfoText>
			<Link href={pageUrls.tariffs.path}>
				<Button>Тарифы</Button>
			</Link>
		</InfoWrapper>
	)
}

function BalanceRequiredView() {
	return (
		<InfoWrapper>
			<InfoText>
				Вы исчерпали лимит на переводы. После окончания срока подписки вы сможете приобрести новую.
			</InfoText>
		</InfoWrapper>
	)
}

function InfoWrapper({ children }: { children: React.ReactNode }) {
	return <div className='view-router__wrapper'>{children}</div>
}

function InfoText({ children }: { children: string }) {
	return <p className='view-router__text'>{children}</p>
}
