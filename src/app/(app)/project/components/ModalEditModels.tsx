'use client'

import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { EditModelsTabs } from './EditModelsTabs'

interface DialogHeaderModalProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function ModalEditModels({
	open,
	onOpenChange,
}: DialogHeaderModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={'icon'} variant={'outline'}>
					<Pencil size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-lg pt-10 ">
				<EditModelsTabs />
			</DialogContent>
		</Dialog>
	)
}
