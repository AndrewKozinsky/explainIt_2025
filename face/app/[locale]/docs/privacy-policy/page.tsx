import { getRuntimeRegion } from '@/shared/utils/getRuntimeRegion'
import PrivacyPolicyIntlPage from '_pages/docs/PrivacyPolicyIntlPage/PrivacyPolicyIntlPage'
import PrivacyPolicyPage from '_pages/docs/PrivacyPolicyPage/PrivacyPolicyPage'

export default async function Page() {
	// У immersia.site своя политика под GDPR, у explainit.ru — под законодательство РФ.
	return getRuntimeRegion() === 'intl' ? <PrivacyPolicyIntlPage /> : <PrivacyPolicyPage />
}
