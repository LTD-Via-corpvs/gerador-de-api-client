import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/services/api'
import { useAppSelector } from '@/store'
import { edit } from '@/store/slices/modelsSlice'

const schema = z.object({
	newRouteName: z
		.string()
		.min(
			4,
			'Nome da Nova Rota deve ter pelo menos 4 caracteres incluindo a barra inicial.',
		)
		.refine((value) => /^\/[a-z]+$/i.test(value), {
			message:
				'Nome da Nova Rota deve começar com uma barra seguida apenas por letras sem espaços ou caracteres especiais.',
		}),
})

type EditRouteSchema = z.infer<typeof schema>

export const EditModelTabsRoute = () => {
	const params = useParams<{ 'project-name': string }>()
	const shablau = useAppSelector((state) => state.editSlice.models)
	const dispatch = useDispatch()

	const projectName = params['project-name']

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<EditRouteSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			newRouteName: '',
		},
	})

	const onSubmit = async ({ newRouteName }: EditRouteSchema) => {
		try {
			const response = api('/api/routes?project=' + projectName, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					old_route: shablau.route.replace('/', ''),
					new_route: newRouteName.replace('/', '').toLowerCase(),
				}),
			})

			toast.promise(response, {
				loading: `Atualizando rota ${shablau.route} de ${projectName}.`,
				success: () => {
					dispatch(edit({ oldRoute: shablau.route, newRoute: newRouteName }))
					reset()
					return `Nome da rota ${shablau.route} alterado para ${newRouteName}!`
				},
				error: () => {
					return `Erro ao atualizar a rota ${shablau.route}.`
				},
			})
		} catch (error) {
			console.error('Error:', error)
		}
	}
	return (
		<Card>
			<CardHeader className="pb-0">
				<CardTitle>Rota</CardTitle>
				<CardDescription>
					Edite as informações sobre a rota aqui. Clique em salvar quando
					terminar.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					className="grid gap-4 "
					onSubmit={handleSubmit((data) => {
						onSubmit(data)
					})}
				>
					<div className="flex flex-col  gap-4">
						<Label htmlFor="newRouteName" className="text-left">
							Rota antiga
						</Label>
						<Input id="newRouteName" value={shablau.route} disabled />
					</div>
					<div className="flex flex-col  gap-4">
						<Label htmlFor="newRouteName" className="text-left">
							Nome da Nova Rota
						</Label>
						<Input id="newRouteName" {...register('newRouteName')} />
					</div>
					{errors.newRouteName && (
						<span className="text-sm text-red-600	">
							{errors.newRouteName.message}
						</span>
					)}
					<Button type="submit" disabled={isSubmitting}>
						Enviar
						{isSubmitting && '...'}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

// export function DialogCreateModels({
// 	open,
// 	onOpenChange,
// }: DialogHeaderModalProps) {
// 	useEffect(() => {
// 		reset()
// 	}, [open])

// 	const dispatch = useDispatch()

// 	return (
// 		<Dialog onOpenChange={onOpenChange} open={open}>
// 			<DialogTrigger asChild>
// 				<Button>Criar Model</Button>
// 			</DialogTrigger>
// 			<DialogContent className="rounded-lg sm:max-w-[425px]">
// 				<DialogHeader>
// 					<DialogTitle>Adicionar Modelo</DialogTitle>
// 					<DialogDescription>
// 						Preencha as informações sobre o novo modelo.
// 					</DialogDescription>
// 				</DialogHeader>
// 			</DialogContent>
// 		</Dialog>
// 	)
// }
