import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import Login from "./components/login/Login.tsx"
import Register from "./components/signup/Register.tsx"
import Dashboard from "./components/dashboard/Dashboard.tsx"
import "./index.css"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <div>Page Not Found</div>,
		children: [{ path: "dashboard", element: <Dashboard /> }],
	},
	{
		path: "/signup",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
