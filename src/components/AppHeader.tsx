import { Code } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const AppHeader = () => {
	return (
		<header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-950">
			<Link className="flex items-center gap-2 font-semibold" href="#">
				<Code className="h-6 w-6" />
				<span className="hidden sm:block">API Generator</span>
			</Link>
			<nav className="flex items-center gap-4">
				<Link
					className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
					href="#"
				>
					Docs
				</Link>
				<Link
					className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
					href="#"
				>
					Pricing
				</Link>
				<Link
					className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
					href="#"
				>
					Contact
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="rounded-full bg-slate-400"
							size="icon"
							variant="ghost"
						></Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>John Doe</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
		</header>
	)
}
