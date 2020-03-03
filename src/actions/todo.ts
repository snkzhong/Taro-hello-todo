import * as C from '../constants/todo'

interface ActionI {
    type: string
}

export interface AnyActionI extends ActionI {
    [propsName: string]: any
}

export const todoAddAction = (text: string): AnyActionI => { return {type: C.TODO_ADD, text: text} }
export const todoToggleAction = (id: number): AnyActionI => { return {type: C.TODO_TOGGLE, id: id} }
export const todoDeleteAction = (id: number): AnyActionI => { return {type: C.TODO_DELETE, id: id} }
export const todoFilterAction = (filter: string): AnyActionI => { return {type: C.TODO_FILTER_CHANGE, filter: filter} }