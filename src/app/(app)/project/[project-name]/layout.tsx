import { ReactNode } from 'react'

import { AppHeader } from '@/components/AppHeader'
import { Toaster } from '@/components/ui/sonner'

const layoutApp = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex min-h-screen flex-col">
			<AppHeader />
			<Toaster position="top-center" />
			{children}
		</div>
	)
}

export default layoutApp
