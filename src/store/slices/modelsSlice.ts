import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Model {
	name: string
	file: string
	route: string
}

interface ModelState {
	models: Model[]
}

const initialState: ModelState = {
	models: [],
}

export const modelsSlice = createSlice({
	name: 'modelsSlice',
	initialState,
	reducers: {
		start: (state, action: PayloadAction<Model[]>) => {
			state.models = action.payload
		},
		add: (state, action: PayloadAction<Model>) => {
			state.models.push(action.payload)
		},
	},
})

export const { start, add } = modelsSlice.actions

export default modelsSlice.reducer
