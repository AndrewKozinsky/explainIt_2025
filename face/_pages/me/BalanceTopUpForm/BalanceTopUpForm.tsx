'use client'

import Button from 'ui/formRelated/buttons/Button/Button'
import FormError from 'ui/formRelated/FormError/FormError'
import TextInput from 'ui/formRelated/TextInput/TextInput'
import { useBalanceTopUpForm } from './fn/useBalanceTopUpForm'
import './BalanceTopUpForm.scss'

function BalanceTopUpForm() {
	const { amountInRubles, formError, loading, handleSubmit, handleAmountChange } = useBalanceTopUpForm()

	return (
		<form className='balance-top-up-form' onSubmit={handleSubmit}>
			<h3 className='balance-top-up-form__title'>Пополнение баланса</h3>
			<div className='balance-top-up-form__row'>
				<TextInput
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
			</div>
			<FormError text={formError} />
		</form>
	)
}

export default BalanceTopUpForm
