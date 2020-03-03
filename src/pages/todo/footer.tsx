import Taro from '@tarojs/taro'
import { View } from "@tarojs/components";
import { useSelector } from '../../store/index'
import {getFilterTodos} from '../../store/selector'

function FooterComponent()
{
    const todoCount = useSelector( state => { return getFilterTodos(state).length } )
    return <View className='footerContainer'>
        Total {todoCount} todos.
    </View>
}

export default FooterComponent