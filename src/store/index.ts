import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import counterSlice from './slices/counterSlice'
import editSlice from './slices/editSlice'
import modelsSlice from './slices/modelsSlice'
import projectsSlice from './slices/projectsSlice'

export const store = configureStore({
	reducer: {
		counterSlice,
		projectsSlice,
		modelsSlice,
		editSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
