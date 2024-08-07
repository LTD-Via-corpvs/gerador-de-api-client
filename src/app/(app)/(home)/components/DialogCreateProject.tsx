'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { api } from '@/services/api'
import { add } from '@/store/slices/projectsSlice'

const schema = z.object({
	package_manager: z
		.string({
			message: 'Selecione um Package Manager.',
		})
		.min(1, 'Selecione um Package Manager.'),
	project_name: z
		.string()
		.min(3, 'Nome do Projeto deve ter pelo menos 3 caracteres.')
		.refine((value) => /^[A-Za-z]+$/i.test(value), {
			message:
				'Nome do Projeto deve conter apenas letras sem espaços ou caracteres especiais.',
		}),
})

type createProjectSchema = z.infer<typeof schema>

interface DialogHeaderModalProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function DialogCreateProject({
	open,
	onOpenChange,
}: DialogHeaderModalProps) {
	const [loading, setLoading] = useState(false)
	const [packages, setPackages] = useState([])

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<createProjectSchema>({
		resolver: zodResolver(schema),
	})

	useEffect(() => {
		api('/packages', { method: 'GET' })
			.then((res) => res.json())
			.then(setPackages)
	}, [])

	useEffect(() => {
		reset()
	}, [open, reset])

	const dispatch = useDispatch()

	const router = useRouter()

	const onSubmit = async (data: createProjectSchema) => {
		try {
			setLoading(true)

			const response = api('/api/init', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			if (onOpenChange) onOpenChange(false)
			toast.promise(response, {
				loading: `Gerando ${data.project_name}...`,
				success: () => {
					dispatch(add(data.project_name))
					router.push(`/project/${data.project_name}`)
					return `${data.project_name} criado com sucesso!`
				},
				error: () => {
					return `Erro ao criar ${data.project_name}.`
				},
			})
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogTrigger asChild>
				<Button
					size="icon"
					className="relative box-border h-9 w-9 cursor-pointer rounded-xl bg-blue-500
				text-white shadow shadow-blue-500/50 outline-2 outline-offset-2 outline-blue-500
				transition hover:scale-105 hover:bg-blue-600 hover:outline-none focus:outline
				active:scale-95 active:bg-blue-700 active:shadow-sm disabled:bg-blue-400
				disabled:shadow-none  "
				>
					<Plus size={18} strokeWidth={3} />
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-lg sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Projeto</DialogTitle>
					<DialogDescription>
						Preencha as informações sobre o novo projeto.
					</DialogDescription>
				</DialogHeader>
				<form
					className="grid gap-4 py-4"
					onSubmit={handleSubmit((data) => {
						onSubmit(data)
					})}
				>
					<div className="flex flex-col gap-4 sm:grid sm:grid-cols-4 sm:items-center">
						<Label htmlFor="package_manager" className="text-left">
							Package Manager
						</Label>
						<Controller
							name="package_manager"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} defaultValue="">
									<SelectTrigger className="col-span-3">
										<SelectValue
											className="capitalize"
											placeholder="Selecione um Package Manager"
										/>
									</SelectTrigger>
									<SelectContent>
										{packages.map((pkg) => (
											<SelectItem className="capitalize" key={pkg} value={pkg}>
												{pkg}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					{errors.package_manager && (
						<span className="text-sm text-red-600">
							{errors.package_manager.message}
						</span>
					)}
					<div className="flex flex-col gap-4 sm:grid sm:grid-cols-4 sm:items-center">
						<Label htmlFor="project_name" className="text-left">
							Nome do Projeto
						</Label>
						<Input
							id="project_name"
							className="col-span-3"
							{...register('project_name')}
						/>
					</div>
					{errors.project_name && (
						<span className="text-sm text-red-600">
							{errors.project_name.message}
						</span>
					)}
					<Button type="submit" disabled={loading}>
						Enviar
						{loading && '...'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
