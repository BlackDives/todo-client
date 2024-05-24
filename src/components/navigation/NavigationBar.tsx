import React, { useEffect, useState } from "react"
import {
	FaRegCircleCheck,
	FaListCheck,
	FaHouseChimneyUser,
	FaGear,
	FaRegCircleUser,
} from "react-icons/fa6"
import { useAuth } from "@/Context/useAuth"

const Links = [
	{
		id: 1,
		title: "Home",
		href: "/dashboard",
		icon: <FaHouseChimneyUser size={22} />,
	},
	{
		id: 2,
		title: "All Tasks",
		href: "/tasks",
		icon: <FaListCheck size={22} />,
	},
]

export default function NavigationBar() {
	const { user, logout } = useAuth()

	const [active, setActive] = useState<string | null>(null)

	useEffect(() => {
		const url = window.location.href.split("/")[3]
		setActive(`/${url}`)
	}, [])

	return (
		<div className='fixed top-0 bg-neutral-900 h-full w-inherit flex flex-col items-center justify-between p-5'>
			<div className='w-full flex flex-col items-center mt-10'>
				<div className='text-neutral-50 text-xl font-bold mb-10 w-3/4 flex flex-row justify-start items-center'>
					<div className='mr-3'>
						<FaRegCircleCheck />
					</div>
					Flowsion
				</div>
				<div className='w-full flex flex-col items-center'>
					<ul className='flex flex-col items-start w-3/4'>
						{Links.map((data) => (
							<li
								className={`mb-4 w-full rounded-lg flex flex-row items-center ${
									active === data.href ? "bg-neutral-800" : ""
								} p-3`}
								key={data.id}
							>
								<div className='text-neutral-50'>{data.icon}</div>
								<a className='text-neutral-50 text-xl ml-3' href={data.href}>
									{data.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='w-full flex flex-col items-center mb-12'>
				<div className='mb-5'>
					<button className='text-neutral-50 text-xl font-bold flex flex-row items-center'>
						<div
							className='mr-3'
							onClick={() => {
								logout()
							}}
						>
							<FaGear />
						</div>
						Settings
					</button>
				</div>
				<button className='text-neutral-50 text-xl bg-neutral-800 p-5 rounded-lg flex flex-row items-center'>
					<div className='mr-3'>
						<FaRegCircleUser />
					</div>
					{user?.userName}
				</button>
			</div>
		</div>
	)
}
