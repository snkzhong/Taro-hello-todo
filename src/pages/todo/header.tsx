import Taro, { useState } from '@tarojs/taro'
import { View, Text, Input } from "@tarojs/components";

function HeaderComponent({boundActionCreators})
{
    const [inputVal, setInputVal] = useState('')

    return <View className='todoHeader'>
        <View className='title'><Text>Todo</Text></View>
        <View>
        <Input type='text' value={inputVal} placeholder='please input some text' onConfirm={e=>{
            if (e.detail.value) {
                boundActionCreators.todoAddAction(e.detail.value.trim())
                setInputVal('')
            }
        }}
        />
        </View>
    </View>;
}

export default HeaderComponent