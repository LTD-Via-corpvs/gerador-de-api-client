import { ReactNode } from 'react'

import { AppHeader } from '@/components/AppHeader'

const layoutApp = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex min-h-screen flex-col">
			<AppHeader />
			{children}
		</div>
	)
}

export default layoutApp
