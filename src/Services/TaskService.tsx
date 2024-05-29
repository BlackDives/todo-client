import { TaskModel } from "@/Models/Task"
import { TaskPatch } from "@/Models/TaskPatch"
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

export const updateTask = async (taskId: number, data: TaskPatch[]) => {
	const token = localStorage.getItem("token")
	try {
		const response = await axios.patch(`${api}/tasks/${taskId}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		})
		console.log("response", response.data)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export const deleteTask = async (taskId: number) => {
	const token = localStorage.getItem("token")

	try {
		const response = await axios.delete(`${api}/tasks/${taskId}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return response.data
	} catch (error) {
		console.error(error)
	}
}
