'use client'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { TableLIne } from './TableLIne'
import { useEffect } from 'react'
import { api } from '@/services/api'
import { useDispatch } from 'react-redux'
import { start } from '@/store/slices/modelsSlice'
import { useAppSelector } from '@/store'

export const ListModels = ({ projectName }: { projectName: string }) => {
	const dispatch = useDispatch()
	const models = useAppSelector((state) => state.modelsSlice.models)

	useEffect(() => {
		api(`${'/api/all?project='}${projectName}`)
			.then((res) => res.json())
			.then((data) => {
				dispatch(start(data.data.models))
			})
	}, [])

	return (
		<TableBody>
			{models ? (
				models.map((model) => (
					<TableLIne
						key={model.route}
						file={model.file}
						model={model.name}
						route={model.route}
					/>
				))
			) : (
				<TableRow>
					<TableCell>sem modelos</TableCell>
				</TableRow>
			)}
		</TableBody>
	)
}
