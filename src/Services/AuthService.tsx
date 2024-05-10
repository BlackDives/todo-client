import axios from "axios"
import { handleError } from "@/Helpers/ErrorHandler"
import { UserProfileToken } from "@/Models/User"

const api = "https://localhost:7036/api"

export const loginAPI = async (username: string, password: string) => {
	try {
		const data = await axios.post<UserProfileToken>(`${api}/account/login`, {
			username,
			password,
		})
		return data
	} catch (error) {
		handleError(error)
	}
}

export const registerAPI = async (
	username: string,
	email: string,
	password: string
) => {
	try {
		const data = await axios.post<UserProfileToken>(`${api}/account/register`, {
			username,
			email,
			password,
		})
		return data
	} catch (error) {
		handleError(error)
	}
}
