'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/services/api'
import { useAppSelector } from '@/store'
import { start } from '@/store/slices/modelsSlice'

import { TableLIne } from './TableLIne'

export const ListModels = () => {
	const dispatch = useDispatch()
	const models = useAppSelector((state) => state.modelsSlice.models)
	const params = useParams<{ 'project-name': string }>()

	useEffect(() => {
		api('/api/all?project=' + params['project-name'])
			.then((res) => res.json())
			.then((data) => {
				const models = data?.data?.models ?? []
				dispatch(start(models))
			})
	}, [dispatch])

	return (
		<TableBody>
			{models ? (
				models.map((model) => {
					return (
						<TableLIne
							key={model.route}
							file={model.file}
							model={model.name}
							route={model.route}
						/>
					)
				})
			) : (
				<TableRow>
					<TableCell>sem modelos</TableCell>
				</TableRow>
			)}
		</TableBody>
	)
}
