import { TableCell, TableRow } from '@/components/ui/table'

import { ModalEditModels } from './ModalEditModels'

interface TableLineProps {
	route: string
	model: string
	file: string
}

export const TableLIne = ({ file, model, route }: TableLineProps) => {
	return (
		<TableRow>
			<TableCell>{route}</TableCell>
			<TableCell>{model}</TableCell>
			<TableCell>{file}</TableCell>
			<TableCell>
				<ModalEditModels file={file} route={route} name={model} />
			</TableCell>
		</TableRow>
	)
}
