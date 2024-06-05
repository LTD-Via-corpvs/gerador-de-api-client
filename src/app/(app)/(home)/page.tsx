import { Activity, Gauge, GitMerge } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function page() {
	return (
		<main className="p-6">
			<div className="grid gap-6">
				<div className="grid gap-4">
					<div>
						<h1 className="text-2xl font-bold">Welcome, John!</h1>
						<p className="text-gray-500 dark:text-gray-400">
							Here&apos;s an overview of your API usage.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardContent className="flex flex-col items-start gap-2">
								<div className="flex items-center gap-2">
									<Activity className="h-6 w-6 text-gray-500 dark:text-gray-400" />
									<h3 className="text-lg font-semibold">API Calls</h3>
								</div>
								<div className="text-4xl font-bold">1,234</div>
								<p className="text-gray-500 dark:text-gray-400">Last 30 days</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex flex-col items-start gap-2">
								<div className="flex items-center gap-2">
									<Gauge className="h-6 w-6 text-gray-500 dark:text-gray-400" />
									<h3 className="text-lg font-semibold">API Latency</h3>
								</div>
								<div className="text-4xl font-bold">125ms</div>
								<p className="text-gray-500 dark:text-gray-400">
									Average response time
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex flex-col items-start gap-2">
								<div className="flex items-center gap-2">
									<GitMerge className="h-6 w-6 text-gray-500 dark:text-gray-400" />
									<h3 className="text-lg font-semibold">API Usage</h3>
								</div>
								<div className="text-4xl font-bold">89%</div>
								<p className="text-gray-500 dark:text-gray-400">
									of your plan limit
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className="grid gap-4">
					<div>
						<h2 className="text-xl font-bold">API Management</h2>
						<p className="text-gray-500 dark:text-gray-400">
							Create and manage your APIs.
						</p>
					</div>
					<Card>
						<CardContent className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="api-name">API Name</Label>
								<Input id="api-name" placeholder="Enter API name" />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="api-description">API Description</Label>
								<Textarea
									id="api-description"
									placeholder="Enter API description"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="api-endpoint">API Endpoint</Label>
								<Input id="api-endpoint" placeholder="Enter API endpoint" />
							</div>
							<Button className="w-full">Create API</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	)
}
