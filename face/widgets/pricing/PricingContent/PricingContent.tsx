import AfterSubscription from '../AfterSubscription/AfterSubscription'
import LimitRefillNote from '../LimitRefillNote/LimitRefillNote'
import PricingPlans from '../PricingPlans/PricingPlans'
import './PricingContent.scss'

function PricingContent() {
	return (
		<div className='pricing-page__content'>
			<PricingPlans />
			<LimitRefillNote />
			<AfterSubscription />
		</div>
	)
}

export default PricingContent
