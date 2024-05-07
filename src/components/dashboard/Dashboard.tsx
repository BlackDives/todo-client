import React from "react"
import DashboardSearch from "./DashboardSearch"

type DashboardCardProps = {
	title: string
	date: string
}

const taskCards = [
	{
		title: "Design Marketing Campaign",
		date: "25 Apr 2024",
	},
	{
		title: "Create Presentation Deck",
		date: "24 Apr 2024",
	},
	{
		title: "UI/UX Designs for Website",
		date: "23 Apr 2024",
	},
	{
		title: "Develop Feature X",
		date: "22 Apr 2024",
	},
	{
		title: "Finish Project Documentation",
		date: "21 Apr 2024",
	},
	{
		title: "Review Codebase",
		date: "20 Apr 2024",
	},
	{
		title: "Do Homework",
		date: "19 Apr 2024",
	},
	{
		title: "Conduct Team Meeting",
		date: "18 Apr 2024",
	},
]

export default function Dashboard() {
	return (
		<div className='flex flex-col bg-neutral-900 p-5 h-full overflow-y-auto'>
			<div className='mb-4'>
				<DashboardSearch />
			</div>
			<div>
				<div className='mb-4'>
					<button className='bg-primary-500 mt-2 p-3 rounded text-primary-100 w-60 hover:bg-primary-400 font-bold'>
						CREATE
					</button>
				</div>
				<div className='flex flex-col space'>
					<div className='mb-4'>
						<p className='text-neutral-100 text-4xl font-bold'>Tasks</p>
					</div>
					<div className='flex flex-col w-1/2'>
						<div className='mb-4'>
							{taskCards.map((task, index) => (
								<div key={index} className='mb-4'>
									<DashboardCard title={task.title} date={task.date} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const DashboardCard: React.FC<DashboardCardProps> = (
	props: DashboardCardProps
) => {
	const { title, date } = props
	return (
		<div className='bg-neutral-800 h-[150px] rounded-xl p-2'>
			<p className='text-2xl text-neutral-100'>{title}</p>
			<p className='text-neutral-500'>{date}</p>
		</div>
	)
}
