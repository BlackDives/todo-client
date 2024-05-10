import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faSearch,
	faGrip,
	faMattressPillow,
	faListCheck,
} from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "@/Context/useAuth"

const Links = [
	{ id: 1, title: "Home", href: "/dashboard", icon: faGrip },
	{ id: 2, title: "All Tasks", href: "/tasks", icon: faListCheck },
]

export default function NavigationBar() {
	const { user, logout } = useAuth()

	console.log(user)
	return (
		<div className='bg-neutral-900 h-full w-full flex flex-col items-center justify-between p-5'>
			<div className='w-full flex flex-col items-center mt-10'>
				<div className='text-neutral-50 text-2xl font-bold mb-10 w-full flex flex-col items-center'>
					Flowsion
				</div>
				<div className='w-full flex flex-col items-center'>
					<ul className='flex flex-col items-start'>
						{Links.map((data) => (
							<li className='mb-4' key={data.id}>
								<FontAwesomeIcon className='text-neutral-50' icon={data.icon} />
								<a className='text-neutral-50 text-2xl ml-2' href={data.href}>
									{data.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='w-full flex flex-col items-center mb-12'>
				<div className='mb-5'>
					<button className='text-neutral-50 text-2xl'>Settings</button>
				</div>
				<button className='text-neutral-50 bg-neutral-800 p-5 rounded 3xl:w-2/4 flex flex-col items-center w-3/4'>
					{user?.userName}
				</button>
			</div>
		</div>
	)
}
