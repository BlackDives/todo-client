import React, { SyntheticEvent, useEffect, useState } from "react"
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
import {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
} from "@/Services/TaskService"
import { TaskModel } from "@/Models/Task"
import { TaskPatch } from "@/Models/TaskPatch"

type DashboardCardProps = {
	id: number
	title: string
	date: string
	priority: number
	status: boolean
	description: string
	open: (
		e,
		id: number,
		title: string,
		date: string,
		priority: number,
		priorityMap: string,
		description: string
	) => void
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
	const [currentTaskId, setCurrentTaskId] = useState<number | null>(null)
	const [openExistingTask, setOpenExistingTask] = useState(true)
	const [fetchedTasks, setFetchedTasks] = useState(false)
	const [existingTaskName, setExistingTaskName] = useState<string>("")
	const [existingTaskPriority, setExistingTaskPriority] = useState<string>("0")
	const [existingTaskDescription, setExistingTaskDescription] =
		useState<string>("")
	const [existingTaskDate, setExistingTaskDate] = useState<string>("")
	const [isEditMode, setIsEditMode] = useState(false)
	const [patchDoc, setPatchDoc] = useState<TaskPatch>()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskModel>({ resolver: yupResolver(validation) })

	const {
		register: registerExisting,
		setValue,
		getValues,
		watch,
		handleSubmit: handleEditSubmit,
	} = useForm<TaskModel>()

	const submitTask = (form: TaskModel) => {
		createTask(form)
		setOpen(false)
		setFetchedTasks(true)
		reset()
	}

	const handleEditTask = () => {
		const patchDoc = []
		const newTaskName = getValues("taskName")
		const newPriority = getValues("priority")
		const newDescription = getValues("taskDescription")

		if (!(newTaskName === existingTaskName)) {
			patchDoc.push({
				operationType: 0,
				op: "add",
				path: "/Name",
				value: newTaskName,
			})
		}

		if (!(newDescription === existingTaskDescription)) {
			patchDoc.push({
				operationType: 0,
				op: "add",
				path: "/Description",
				value: newDescription,
			})
		}

		if (!(mapPriority(newPriority) === existingTaskPriority)) {
			patchDoc.push({
				operationType: 0,
				op: "add",
				path: "/Priority",
				value: newPriority,
			})
		}

		if (patchDoc.length === 0) {
			console.log("No changes")
		} else {
			console.log("Submitting: ", patchDoc)
			updateTask(currentTaskId!, patchDoc)
			setOpenExistingTask(false)
			setFetchedTasks(true)
		}
	}

	const handleDeleteTask = (currentId: number) => {
		deleteTask(currentId)
		setOpenExistingTask(false)
		setFetchedTasks(true)
	}

	const openTask = (
		e,
		id: number,
		title: string,
		date: string,
		priority: number,
		priorityMap: string,
		description: string
	) => {
		console.log(e)
		setIsEditMode(false)
		setCurrentTaskId(id)
		setExistingTaskName(title)
		setExistingTaskDate(date)
		setExistingTaskPriority(priorityMap)
		setExistingTaskDescription(description)
		setOpenExistingTask(true)
		setValue("taskName", title)
		setValue("taskDescription", description)
		setValue("priority", priority)
	}

	useEffect(() => {
		if (isLoggedIn() === false) {
			navigate("/register")
		}
		console.log("running useEffect")

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
						<p className='text-2xl text-neutral-50 font-bold'>
							{new Date().toLocaleDateString("en-US", {
								weekday: "long",
								day: "2-digit",
								month: "long",
							})}
						</p>
						{/*  */}
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
												id={task.id}
												title={task.name}
												date={task.createdDate}
												priority={task.priority}
												status={task.status}
												description={task.description}
												open={openTask}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Drawer
				open={openExistingTask}
				anchor='right'
				onClose={() => {
					setOpenExistingTask(false)
					setIsEditMode(false)
				}}
			>
				{isEditMode ? (
					<form
						className='h-full w-full'
						onSubmit={handleEditSubmit(handleEditTask)}
					>
						<div className='bg-neutral-800 h-full w-full p-4 flex flex-col justify-between'>
							<div>
								<div className='mb-5'>
									<p className='text-neutral-50 text-xl font-bold'>
										Edit drawer
									</p>
								</div>
								<div>
									<div className='mb-3'>
										<p className='text-neutral-400 font-bold mb-1'>Title</p>
										<input
											className='rounded w-full p-1 bg-transparent border-2 border-neutral-700 text-neutral-50 focus:outline-none focus:border-primary-500'
											{...registerExisting("taskName")}
										/>
									</div>
									<div className='mb-5'>
										<p className='text-neutral-400 font-bold mb-1'>Priority</p>
										<select
											className='w-full rounded p-1 bg-transparent border-2 border-neutral-700 text-neutral-50 focus:border-primary-500'
											{...registerExisting("priority")}
										>
											<option value={0}>Low</option>
											<option value={1}>Medium</option>
											<option value={2}>High</option>
										</select>
									</div>
									<div>
										<p className='text-neutral-400 font-bold mb-1'>
											Description
										</p>
										<textarea
											className='w-full p-2 rounded bg-transparent border-2 border-neutral-700 text-neutral-50 focus:outline-none focus:border-primary-500'
											{...registerExisting("taskDescription")}
										/>
									</div>
								</div>
							</div>
							<div className='flex flex-row justify-between'>
								<button
									className='mr-3 text-neutral-50 rounded p-2 border-2 border-neutral-700 w-[90px] font-bold'
									onClick={() => setIsEditMode(false)}
								>
									Cancel
								</button>
								<button className='bg-primary-300 rounded p-2 text-primary-900 w-[90px] font-bold'>
									Save
								</button>
							</div>
						</div>
					</form>
				) : (
					<div className='bg-neutral-800 h-full w-full p-4 flex flex-col justify-between'>
						<div>
							<div className='mb-6'>
								<p className='text-neutral-50 text-xl font-bold'>
									{existingTaskName}
								</p>
							</div>
							<div>
								<div className='flex flex-row'>
									<p className='text-neutral-400 font-bold text-lg w-1/5'>
										Priority
									</p>
									<p className='text-neutral-50'>{existingTaskPriority}</p>
								</div>
								<div className='flex flex-row mb-6'>
									<p className='text-neutral-400 font-bold text-lg w-1/5'>
										Start
									</p>
									<p className='text-neutral-50'>{existingTaskDate}</p>
								</div>
								<div className='flex flex-col'>
									<p className='text-neutral-400 font-bold text-lg mb-2'>
										Description
									</p>
									<p className='text-neutral-50'>{existingTaskDescription}</p>
								</div>
							</div>
						</div>
						<div className='flex flex-row justify-between'>
							<button
								className='bg-secondary-300 text-secondary-900 rounded p-2 w-[90px] font-bold'
								onClick={() => handleDeleteTask(currentTaskId!)}
							>
								Delete
							</button>
							<button
								className='bg-primary-300 text-primary-900 rounded p-2 w-[90px] font-bold'
								onClick={() => setIsEditMode(true)}
							>
								Edit
							</button>
						</div>
					</div>
				)}
			</Drawer>
		</div>
	)
}

export const DashboardCard: React.FC<DashboardCardProps> = (
	props: DashboardCardProps
) => {
	const { id, title, date, priority, description, status, open } = props

	const priorityMap = mapPriority(priority)
	const readableDate = formatReadableDate(date)
	return (
		<div
			className='bg-neutral-700 h-[200px] rounded-xl mt-8'
			onClick={(e) =>
				open(e, id, title, readableDate, priority, priorityMap, description)
			}
		>
			<div className='h-full flex flex-row'>
				<div className='h-full w-[30px] bg-secondary-400 rounded-l-lg' />
				<div className='ml-2 flex flex-row p-2'>
					<div className='flex flex-col justify-start'>
						<p className='text-2xl text-neutral-100 font-bold'>{title}</p>
						<p className='text-neutral-500'>
							{readableDate} - {priorityMap} Priority
						</p>
						<div className='mt-2'>
							<p className='text-neutral-50'>{description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
