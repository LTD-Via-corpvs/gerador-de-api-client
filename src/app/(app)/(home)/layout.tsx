import { ReactNode } from 'react'

import { AppHeader } from '@/components/AppHeader'
import { Toaster } from '@/components/ui/sonner'

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<AppHeader />
			<Toaster position="top-center" />
			{children}
		</>
	)
}

export default layout
