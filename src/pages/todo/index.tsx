import Taro from '@tarojs/taro'
import { View } from '@tarojs/components';
import HeaderComponent from './header';
import FooterComponent from './footer';
import TodoListComponent from './todolist';

import { useBindActionCreators } from '../../store/index'
import * as TodoActionCreators from '../../actions/todo'

import "./index.scss";

function IndexComponent()
{
    const boundActionCreators = useBindActionCreators(TodoActionCreators)

    return <View className='todoContainer'>
        <HeaderComponent boundActionCreators={boundActionCreators} />
        <TodoListComponent boundActionCreators={boundActionCreators} />
        <FooterComponent />
    </View>
}

export default IndexComponent