import React from "react"
import DashboardSearch from "./DashboardSearch"

type DashboardCardProps = {
	title: string
	description: string
}

export default function Dashboard() {
	return (
		<div className='flex flex-col bg-neutral-900 p-5 h-full'>
			<div className='mb-4'>
				<DashboardSearch />
			</div>
			<div>
				<div className='mb-4'>
					<button className='bg-primary-500 mt-2 p-3 rounded text-primary-100 w-60 hover:bg-primary-400 font-bold'>
						CREATE
					</button>
				</div>
				<div className='flex flex-row space'></div>
			</div>
		</div>
	)
}

export function DashboardCard(props: DashboardCardProps) {
	const { title, description } = props
	return (
		<div className='bg-neutral-800 rounded h-[300px] w-[300px] p-2'>
			<div className='h-1/6'>
				<p className='text-neutral-50 text-2xl font-bold'>{title}</p>
			</div>
			<p className='text-neutral-500'>{description}</p>
			<div></div>
		</div>
	)
}
