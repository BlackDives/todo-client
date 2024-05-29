// export type TaskPatch = {
// 	// patchDocument: [
// 	// 	{ operationType: number; path: string; op: string; value: string }
// 	// ]
// 	patchDocument: Patch[]
// }

export type TaskPatch = {
	operationType: number
	op: string
	path: string
	value: string | number
}
