import { Task } from "./Task";
import { Provider } from "react-redux";
import { store } from '../../state/store';
import { action } from '@storybook/addon-actions'


export default {
    title: 'Task Component',
    component: Task
} 

const onChangeCheckedCallback = action('Status changed');
const changeTaskTitleCallback = action('Title changed');
const removeTaskCallback = action('Tasks be removed');


export const TaskBaseExample = () => {

    return <>
        <Provider store={store}>
            <Task
                key={'121212'}
                todoId={'todolistId1'}
                taskId={'1'}
                isDone={true}
                title={'The first task'}
                onChangeChecked={onChangeCheckedCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}

            />

            <Task
                key={'12123'}
                todoId={'todolistId2'}
                taskId={'2'}
                isDone={false}
                title={'The second task'}
                onChangeChecked={onChangeCheckedCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
            />
        </Provider >
    </>

}