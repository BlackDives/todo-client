export type TaskModel = {
	taskName: string
	taskDescription: string
	taskStatus: boolean
	priority: number
}

const priority = Object.freeze({ low: 0, medium: 1, high: 2 })
