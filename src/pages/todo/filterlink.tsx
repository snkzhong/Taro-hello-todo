import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

function FilterLink({text, filter, selected, boundActionCreators})
{
    return <View className={{filterLink:true, active: selected===filter}} onClick={e=>boundActionCreators.todoFilterAction(filter)}>
        {text}
        </View>
}

export default FilterLink