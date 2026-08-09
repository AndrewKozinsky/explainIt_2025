import LogoSign from '../LogoSign/LogoSign'
import './LogoWithText.scss'

function LogoWithText() {
	return (
		<div className='logo-with-text'>
			<LogoSign />
			<div className='logo-with-text__right'>
				<p className='logo-with-text__name'>Explain it</p>
			</div>
		</div>
	)
}

export default LogoWithText
