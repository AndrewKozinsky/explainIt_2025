'use client'

import Button from 'ui/formRelated/buttons/Button/Button'
import FormError from 'ui/formRelated/FormError/FormError'
import TextInput from 'ui/formRelated/TextInput/TextInput'
import { useBalanceTopUpForm } from './fn/useBalanceTopUpForm'
import './BalanceTopUpForm.scss'

function BalanceTopUpForm() {
	const { amountInRubles, formError, loading, handleSubmit, handleAmountChange } = useBalanceTopUpForm()

	return (
		<form onSubmit={handleSubmit}>
			<TextInput
				label='Пополнение баланса'
				inputProps={{
					type: 'text',
					value: amountInRubles,
					onChange: handleAmountChange,
					placeholder: '10',
				}}
				error={formError}
			/>
			<Button type='submit' loading={loading}>
				Пополнить
			</Button>
			<FormError text={formError} />
		</form>
	)
}

export default BalanceTopUpForm
