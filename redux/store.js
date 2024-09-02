import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from './slice/loader.slice'
import enachSlice from './slice/enach.slice'
import enacCancelation from './slice/enacCancelation.slice'

const rootReducer = combineReducers({
    loaderSlice,
    enachSlice,
    enacCancelation,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store