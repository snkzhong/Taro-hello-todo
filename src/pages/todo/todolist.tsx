import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '../../store/index'
import TodoItemComponent from './todoitem'
import FilterLinkComponent from './filterlink'
import * as CONSTANTS from '../../constants/todo'
import {getFilterTodos} from '../../store/selector'

function TodoListComponent({boundActionCreators})
{
    const filterSets = ['All', 'Completed', 'UnCompleted']
    const filter2map = [CONSTANTS.TODO_FILTER_ALL, CONSTANTS.TODO_FILTER_COMPLETED, CONSTANTS.TODO_FILTER_UNCOMPLETED]
    const [todos, filterCurrentSelected] = useSelector(state => { return [getFilterTodos(state), state.filter] })
    
    return <View className='todoListContainer'>
        <View className='filter'>{ filterSets.map( (filter,i) => <FilterLinkComponent key={i} text={filter} filter={filter2map[i]} selected={filterCurrentSelected} boundActionCreators={boundActionCreators} /> ) }</View>
        <View className='title'>Todo List:</View>
        <View className='todoList'>
        { 
            todos.map((item, i)=> <TodoItemComponent key={item.id} todo={item} boundActionCreators={boundActionCreators} /> ) 
        }
        </View>
    </View>
}

export default TodoListComponent