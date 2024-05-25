import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useAuth } from "@/Context/useAuth"
import Drawer from "@mui/joy/Drawer"
import {
	FaSliders,
	FaFilter,
	FaMagnifyingGlass,
	FaCirclePlus,
} from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { getTasks, createTask } from "@/Services/TaskService"
import { TaskModel } from "@/Models/Task"

type DashboardCardProps = {
	title: string
	date: string
	priority: number
	status: boolean
	description: string
}

type UserTask = {
	id: number
	userId: number
	name: string
	description: string
	status: boolean
	priority: number
	createdDate: string
	updatedDate: string
}

const formatReadableDate = (dateString: string): string => {
	const date = new Date(dateString)

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
	}

	return date.toLocaleDateString("en-US", options)
}

const mapPriority = (status: number): string => {
	switch (status) {
		case 0:
			return "Low"
		case 1:
			return "Medium"
		case 2:
			return "High"
		default:
			return ""
	}
}

const validation = Yup.object().shape({
	taskName: Yup.string().required("Task requires a name"),
	taskDescription: Yup.string().required("Task requires a description"),
	taskStatus: Yup.boolean().default(false),
	priority: Yup.number().required(),
})

export default function Dashboard() {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()
	const [tasks, setTasks] = useState<UserTask[]>([])
	const [open, setOpen] = useState(false)
	const [fetchedTasks, setFetchedTasks] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskModel>({ resolver: yupResolver(validation) })

	const submitTask = (form: TaskModel) => {
		createTask(form)
		setOpen(false)
		setFetchedTasks(true)
		reset()
	}

	useEffect(() => {
		if (isLoggedIn() === false) {
			navigate("/register")
		}

		const getData = async () => {
			const data = await getTasks()
			console.log(data)
			setTasks(data)
		}
		getData()
		setFetchedTasks(false)
	}, [fetchedTasks])
	return (
		<div className='flex flex-row bg-gray-800 p-5 h-full'>
			<div className='flex flex-col w-2/3'>
				<div className='mb-8 mt-10 flex flex-row justify-between'>
					<div>
						<p className='text-3xl font-bold text-neutral-50'>All Tasks</p>
					</div>
					<div className='flex flex-row'>
						<button className='bg-neutral-700 mr-3 text-neutral-50 p-2 rounded-lg'>
							<FaSliders />
						</button>
						<button className='bg-neutral-700 mr-3 text-neutral-50 p-2 rounded-lg'>
							<FaFilter />
						</button>
						<button className='bg-neutral-700 mr-3 text-neutral-50 p-2 rounded-lg'>
							<FaMagnifyingGlass />
						</button>
						<button
							className='bg-secondary-300 text-secondary-900 p-2 rounded-lg flex flex-row items-center'
							onClick={() => setOpen(true)}
						>
							<div className='mr-2'>
								<FaCirclePlus />
							</div>
							New Task
						</button>

						<Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
							<form
								className='h-full w-full'
								onSubmit={handleSubmit(submitTask)}
							>
								<div className='bg-neutral-800 h-full w-full p-4 flex flex-col justify-between'>
									<div>
										<div className='mb-5'>
											<p className='text-neutral-50 text-xl font-bold'>
												Create Task
											</p>
										</div>
										<div className='w-full mb-5'>
											<div className='mb-3'>
												<p className='text-neutral-400 font-bold mb-1'>Title</p>
												<input
													type='text'
													className='rounded w-full p-1 bg-transparent border-2 border-neutral-700 text-neutral-50 focus:outline-none focus:border-primary-500'
													{...register("taskName")}
												/>
												{errors.taskName ? (
													<p className='text-rose-700'>
														{errors.taskName.message}
													</p>
												) : (
													""
												)}
											</div>
											{/* <div className='mb-3'>
												<p className='text-neutral-400 font-bold mb-1'>Tags</p>
												<input
													type='text'
													className='w-full rounded p-1 bg-transparent border-2 border-neutral-700 text-neutral-50 focus:outline-none focus:border-primary-500'
												/>
											</div> */}
											<div>
												<p className='text-neutral-400 font-bold mb-1'>
													Priortity
												</p>
												<select
													className='w-full rounded p-1 bg-transparent border-2 border-neutral-700 text-neutral-50 focus:border-primary-500'
													{...register("priority")}
												>
													<option value={0} className='bg-neutral-500'>
														Low
													</option>
													<option value={1} className='bg-neutral-500'>
														Medium
													</option>
													<option value={2} className='bg-neutral-500'>
														High
													</option>
												</select>
												{errors.priority ? (
													<p className='text-rose-700'>
														{errors.priority.message}
													</p>
												) : (
													""
												)}
											</div>
										</div>
										<div>
											<p className='text-neutral-400 font-bold mb-1'>
												Description
											</p>
											<textarea
												className='w-full p-2 rounded bg-transparent border-2 border-neutral-700 text-neutral-50 focus:outline-none focus:border-primary-500'
												{...register("taskDescription")}
											/>
											{errors.taskDescription ? (
												<p className='text-rose-700'>
													{errors.taskDescription.message}
												</p>
											) : (
												""
											)}
										</div>
									</div>
									<div className='flex flex-row justify-end'>
										<button
											className='mr-3 text-neutral-50 rounded p-2 border-2 border-neutral-700 w-[90px] font-bold'
											onClick={() => setOpen(false)}
										>
											Cancel
										</button>
										<button
											type='submit'
											className='bg-primary-300 rounded p-2 text-primary-900 w-[90px] font-bold'
										>
											Create
										</button>
									</div>
								</div>
							</form>
						</Drawer>
					</div>
				</div>
				<div className='border-black border-0'>
					<div className='flex flex-row justify-between'>
						<p className='text-2xl text-neutral-50 font-bold'>Friday, May 9</p>
						<div className='flex flex-row justify-between items-center bg-neutral-700 rounded-lg p-2 w-1/4'>
							<div className='mr-2 w-1/3 rounded-lg bg-neutral-500 flex flex-col items-center'>
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
					<div className='flex flex-col space w-full'>
						<div className='flex flex-col w-full'>
							<div className='mb-4'>
								{tasks
									.slice(0)
									.reverse()
									.map((task, index) => (
										<div key={index} className='mb-4'>
											<DashboardCard
												title={task.name}
												date={task.createdDate}
												priority={task.priority}
												status={task.status}
												description={task.description}
											/>
										</div>
									))}
							</div>
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
	const { title, date, priority, description, status } = props

	const priorityMap = mapPriority(priority)
	const readableDate = formatReadableDate(date)
	return (
		<div className='bg-neutral-700 h-[200px] rounded-xl mt-8'>
			<div className='h-full flex flex-row'>
				<div className='h-full w-[30px] bg-secondary-400 rounded-l-lg' />
				<div className='ml-2 flex flex-row p-2'>
					<div className='flex flex-col justify-start'>
						<div className='flex flex-col items-center'>
							<input
								className='border-neutral-500 bg-neutral-900'
								type='checkbox'
							/>
						</div>
					</div>
					<div className='flex flex-col justify-start'>
						<p className='text-2xl text-neutral-100 font-bold'>{title}</p>
						<p className='text-neutral-500'>
							{readableDate} - {priorityMap} Priority
						</p>
						<div className='flex flex-row mt-2'>
							<p className='bg-neutral-600 text-neutral-50 mr-2 px-2 rounded-lg'>
								label
							</p>
							<p className='bg-neutral-600 text-neutral-50 px-2 rounded-lg'>
								label
							</p>
						</div>
						<div className='mt-2'>
							<p className='text-neutral-50'>{description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
