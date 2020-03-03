import * as CONSTANTS from '../constants/todo'

export function getTodos(state) {
    return state.todos
}

export function getFilter(state) {
    return state.filter
}

export function getFilterTodos(state)
{
    const filter = getFilter(state)
    const todos = getTodos(state)
    switch(filter) {
        case CONSTANTS.TODO_FILTER_ALL: {
            return todos
        }
        case CONSTANTS.TODO_FILTER_COMPLETED: {
            return todos.filter(item=>item.completed)
        }
        case CONSTANTS.TODO_FILTER_UNCOMPLETED: {
            return todos.filter(item=>!item.completed)
        }
        default: 
            return todos
    }
}