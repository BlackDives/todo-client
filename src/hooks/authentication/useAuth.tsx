import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	const login = (username: string, password: string) => {
		// going to implement authentication here and return a token
		setIsAuthenticated(true)
		//setUser()
		navigate("/dashboard")
	}

	const logout = () => {
		setIsAuthenticated(false)
		//setUser()
		navigate("/login")
	}

	return { isAuthenticated, user, login, logout }
}
