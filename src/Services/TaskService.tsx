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

export const CreateTask = async () => {}

export const UpdateTask = () => {}

export const DeleteTask = () => {}
