import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import App from "./App.tsx"
import Login from "./components/login/Login.tsx"
import Register from "./components/signup/Register.tsx"
import Dashboard from "./components/dashboard/Dashboard.tsx"
import { UserProvider } from "./Context/useAuth.tsx"
import "./index.css"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<UserProvider>
					<div className='overflow-y-scroll'>
						<App />
						<ToastContainer />
					</div>
				</UserProvider>
			</>
		),
		errorElement: <div>Page Not Found</div>,
		children: [{ path: "dashboard", element: <Dashboard /> }],
	},
	{
		path: "/register",
		element: (
			<UserProvider>
				<Register />
			</UserProvider>
		),
	},
	{
		path: "/login",
		element: (
			<UserProvider>
				<Login />,
			</UserProvider>
		),
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
