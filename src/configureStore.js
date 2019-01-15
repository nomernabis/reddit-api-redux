import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"

import { selectedSubreddit, postsBySubreddit } from "./reducers"

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState){
    return createStore(combineReducers({selectedSubreddit, postsBySubreddit}), preloadedState,
                        applyMiddleware(thunkMiddleware, loggerMiddleware))
}