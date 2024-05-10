import React, { useEffect } from "react"
import { useAuth } from "@/Context/useAuth"
import DashboardSearch from "./DashboardSearch"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"

type DashboardCardProps = {
	title: string
	date: string
	priority: string
}

const taskCards = [
	{
		title: "Design Marketing Campaign",
		date: "25 Apr 2024",
		priority: "high",
	},
	{
		title: "Create Presentation Deck",
		date: "24 Apr 2024",
		priority: "high",
	},
	{
		title: "UI/UX Designs for Website",
		date: "23 Apr 2024",
		priority: "high",
	},
	{
		title: "Develop Feature X",
		date: "22 Apr 2024",
		priority: "high",
	},
	{
		title: "Finish Project Documentation",
		date: "21 Apr 2024",
		priority: "high",
	},
	{
		title: "Review Codebase",
		date: "20 Apr 2024",
		priority: "high",
	},
	{
		title: "Do Homework",
		date: "19 Apr 2024",
		priority: "high",
	},
	{
		title: "Conduct Team Meeting",
		date: "18 Apr 2024",
		priority: "high",
	},
]

export default function Dashboard() {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (isLoggedIn() === false) {
			navigate("/register")
		}
	}, [])
	return (
		<div className='flex flex-col bg-gray-800 p-5 h-full overflow-y-auto'>
			<div className='flex flex-col w-2/3'>
				<div className='mb-8 mt-10 flex flex-row justify-between'>
					<div>
						<p className='text-3xl font-bold text-neutral-50'>All Tasks</p>
					</div>
					<div>
						<button className='bg-neutral-700 mr-3 text-neutral-50 p-2 rounded'>
							O
						</button>
						<button className='bg-neutral-700 mr-3 text-neutral-50 p-2 rounded'>
							O
						</button>
						<button className='bg-neutral-700 mr-3 text-neutral-50 p-2 rounded'>
							O
						</button>
						<button className='bg-secondary-300 text-secondary-900 p-2 rounded'>
							New Task
						</button>
					</div>
				</div>
				<div>
					<div className='flex flex-row justify-between'>
						<p className='text-2xl text-neutral-50 font-bold'>Friday, May 9</p>
						<div className='flex flex-row justify-between items-center bg-neutral-700 rounded p-2 w-1/4'>
							<div className='mr-2 w-1/3 rounded bg-neutral-500 flex flex-col items-center'>
								<p className='text-neutral-50'>List</p>
							</div>
							<div className='mr-2 w-1/3 rounded flex flex-col items-center'>
								<p className='text-neutral-50'>Board</p>
							</div>
							<div className='mr-2 w-1/3 rounded flex flex-col items-center'>
								<p className='text-neutral-50'>Timeline</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col space'>
						<div className='flex flex-col w-3/4'>
							<div className='mb-4'>
								{taskCards.map((task, index) => (
									<div key={index} className='mb-4'>
										<DashboardCard
											title={task.title}
											date={task.date}
											priority={task.priority}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	)
}

export const DashboardCard: React.FC<DashboardCardProps> = (
	props: DashboardCardProps
) => {
	const { title, date, priority } = props
	return (
		<div className='bg-neutral-700 h-[200px] rounded-xl mt-8'>
			<div className='h-full flex flex-row'>
				<div className='h-full w-[30px] bg-secondary-400 rounded-l' />
				<div className='ml-2 flex flex-row p-2'>
					<div className='flex flex-col justify-start'>
						<div className='flex flex-col items-center'>
							{/* <input
								className='border-neutral-500 bg-neutral-900'
								type='checkbox'
							/> */}
						</div>
					</div>
					<div className='flex flex-col justify-start'>
						<p className='text-2xl text-neutral-100 font-bold'>{title}</p>
						<p className='text-neutral-500'>
							{date} - {priority}
						</p>
						<div className='flex flex-row mt-2'>
							<p className='bg-neutral-600 text-neutral-50 mr-2 px-2 rounded'>
								label
							</p>
							<p className='bg-neutral-600 text-neutral-50 px-2 rounded'>
								label
							</p>
						</div>
						<div className='mt-2'>
							<p className='text-neutral-50'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
								massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
								sapien fringilla, mattis ligula consectetur, ultrices mauris.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
