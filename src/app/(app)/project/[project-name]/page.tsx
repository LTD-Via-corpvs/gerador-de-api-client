'use client'

import { useState } from 'react'

import { Breadcrumb } from '@/components/Breadcrumb'
import { DialogCreateModels } from '@/components/DialogCreateModels'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { ListModels } from './components/ListModels'

export default function Page({
	params,
}: {
	params: { 'project-name': string }
}) {
	const [open, setOpen] = useState(false)
	const projectName = params['project-name']

	return (
		<div className="mx-auto w-full max-w-[1440px] rounded-none border-0 p-6 shadow-none">
			<Breadcrumb>{projectName}</Breadcrumb>
			<Card className="w-full rounded-none border-0 shadow-none">
				<CardHeader className="flex-row items-center justify-between px-0">
					<CardTitle>Informações do Modelo</CardTitle>
					<DialogCreateModels onOpenChange={setOpen} open={open} />
				</CardHeader>
				<CardContent className="px-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Nome da Rota</TableHead>
								<TableHead>Modelo</TableHead>
								<TableHead>Arquivo</TableHead>
								<TableHead className="w-6">Editar</TableHead>
								{/* <TableHead className="w-6">Excluir</TableHead> */}
							</TableRow>
						</TableHeader>
						<ListModels />
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
