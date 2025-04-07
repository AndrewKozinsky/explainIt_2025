import React from 'react'

type LogoProps = {
	extraClass?: string
}

function LogoSign(props: LogoProps) {
	const { extraClass } = props

	return <img className={extraClass} src="/images/common/logo.svg" alt="logo" />
}

export default LogoSign
