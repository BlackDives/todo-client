import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faSearch,
	faGrip,
	faMattressPillow,
	faListCheck,
} from "@fortawesome/free-solid-svg-icons"

const Links = [
	{ id: 1, title: "Dashboard", href: "/dashboard", icon: faGrip },
	{ id: 2, title: "Tasks", href: "/tasks", icon: faListCheck },
	{ id: 1, title: "Analytics", href: "/analytics", icon: faMattressPillow },
]

export default function NavigationBar() {
	return (
		<div className='bg-neutral-800 h-full w-full flex flex-col items-center'>
			<div className='text-neutral-50 text-4xl font-bold mb-10 mt-10 w-2/3'>
				Task Manager
			</div>
			<div></div>
			<div className='w-2/3'>
				<ul className='flex flex-col items-start'>
					{Links.map((data) => (
						<li className='mb-4' key={data.id}>
							<FontAwesomeIcon className='text-neutral-400' icon={data.icon} />
							<a className='text-neutral-400 text-2xl ml-2' href={data.href}>
								{data.title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
