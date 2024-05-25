import { TaskModel } from "@/Models/Task"
import axios from "axios"

const api = "https://localhost:7036/api"

export const getTasks = async () => {
	const token = localStorage.getItem("token")
	try {
		const response = await axios.get(`${api}/tasks`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export const createTask = async (data: TaskModel) => {
	const token = localStorage.getItem("token")
	try {
		const response = await axios.post(`${api}/tasks`, data, {
			headers: { Authorization: `Bearer ${token}` },
		})
		console.log("response.data", response.data)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export const updateTask = () => {}

export const deleteTask = () => {}
