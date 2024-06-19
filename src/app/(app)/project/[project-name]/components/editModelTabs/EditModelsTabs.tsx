import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { EditModelTabsModelName } from './EditModelTabsModelName'
import { EditModelTabsRoute } from './EditModelTabsRoute'

export function EditModelsTabs() {
	return (
		<Tabs defaultValue="table" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="table">Tabela</TabsTrigger>
				<TabsTrigger value="rota">Rota</TabsTrigger>
			</TabsList>
			<TabsContent value="table">
				<EditModelTabsModelName />
			</TabsContent>
			<TabsContent value="rota">
				<EditModelTabsRoute />
			</TabsContent>
		</Tabs>
	)
}
