import * as CONSTANTS from '../constants/todo'

interface TodoItemI {
    id: number
    text: string
    completed: boolean
}

const TODOS_INITIAL_STATE: Array<TodoItemI> = [
    {id:1, text:'hello world', completed:false},
    {id:2, text:'hello Taro', completed:true}
]

let todoAutoIncrId = 2

function todosReducer(state = TODOS_INITIAL_STATE, action)
{
    switch (action.type) {
        case CONSTANTS.TODO_ADD: {
            return [...state, {id: ++todoAutoIncrId, text:action.text, completed:false}]
        }
        case CONSTANTS.TODO_DELETE: {
            return state.filter(item=>{
                return item.id !== action.id
            })
        }
        case CONSTANTS.TODO_TOGGLE: {
            return state.map(item=>{
                if (item.id === action.id) {
                    return {...item, completed:!item.completed}
                }
                return item
            })
        }
        default: {
            return state
        }
    }
}

const FILTER_INITIAL_STATE = CONSTANTS.TODO_FILTER_ALL

function filterReducer(state = FILTER_INITIAL_STATE, action)
{
    if (action.filter) {
        return action.filter
    }
    
    return state
}

export {todosReducer, filterReducer}