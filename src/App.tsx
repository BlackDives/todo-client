import { useState } from "react"
import { Outlet } from "react-router-dom"
import NavigationBar from "./components/navigation/NavigationBar"

function App() {
	return (
		<div className='h-screen w-[1500px] m-auto flex flex-row'>
			<div className='w-1/6 sticky top-0'>
				{/* <div className='fixed top-0 h-[800px] w-[200px] bg-neutral-600'>
					text inside
				</div> */}
				<NavigationBar />
			</div>
			<div className='w-5/6'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
