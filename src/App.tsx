import { useState } from "react"
import { Outlet } from "react-router-dom"
import NavigationBar from "./components/navigation/NavigationBar"

function App() {
	return (
		<div className='h-screen w-screen flex flex-row'>
			<div className='w-1/6 '>
				<NavigationBar />
			</div>
			<div className='w-5/6'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
