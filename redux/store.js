import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from './slice/loader.slice'
import enachSlice from './slice/enach.slice'

const rootReducer = combineReducers({
    loaderSlice,
    enachSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export default store