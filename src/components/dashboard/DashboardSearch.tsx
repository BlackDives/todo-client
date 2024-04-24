import React from "react"

export default function DashboardSearch() {
	return (
		<div>
			<input
				className='p-3 rounded bg-neutral-800 placeholder:text-neutral-500 w-[500px] text-neutral-100 focus:outline-none focus:bg-neutral-600'
				type='text'
				placeholder='Search'
			/>
		</div>
	)
}
