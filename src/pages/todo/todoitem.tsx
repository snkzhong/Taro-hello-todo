import Taro from '@tarojs/taro'
import { View, Checkbox } from '@tarojs/components'

function TodoItemComponent({todo, boundActionCreators})
{
    return <View className={{todoItem:true, active: todo.completed}}>
        <Checkbox value={todo.id} checked={todo.completed} onClick={e=>boundActionCreators.todoToggleAction(todo.id)} /> 
        <View className='content' onClick={e=>boundActionCreators.todoToggleAction(todo.id)}>{todo.id}. {todo.text}</View> 
        <View className='delete' onClick={e=>boundActionCreators.todoDeleteAction(todo.id)}>X</View>
    </View>;
}

export default TodoItemComponent