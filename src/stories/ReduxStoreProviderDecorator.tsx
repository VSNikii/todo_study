import { Provider } from "react-redux"
import { AppRootState, store } from "../state/store"
import { combineReducers, createStore } from "redux"
import { tasksReducer } from "../state/tasks-reducer"
import { todolistsReducer } from "../state/todolists-reducer"
import { v1 as uuidv1 } from "uuid"



export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}