import { useRef, useState, useCallback, useEffect, useMemo } from '@tarojs/taro'
import { createStore, applyMiddleware, bindActionCreators, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

function configStore () {
  const store = createStore(rootReducer, enhancer)
  return store
}

export const store = configStore()

/**
 * 允许你使用 selector 函数从一个 Redux Store 中获取数据
 * @param selector 相对于mapStateToProps函数
 * @param equalityFn 自定义比较数据是否前后一致的函数，true则不更新，false则更新
 */
export function useSelector(selector: Function, equalityFn?: Function) {
  const unsubscribe = useRef(null as any)
  const preState = useRef(store.getState())
  const [result, setResult] = useState(selector(preState.current))

  const updateStore = useCallback(() => {
    const newState = store.getState()
    const preResult = selector(preState.current)
    preState.current = newState
    const newResult = selector(newState)
    if (equalityFn) {
      if (!equalityFn(preResult, newResult)) {
        setResult(newResult)
      }
    } else if (JSON.stringify(preResult) !== JSON.stringify(newResult)) {
      // 这里未实现复杂的diff算法，这种比较方法处理循环引用会报错，需要注意。
      setResult(newResult)
    }
  }, [equalityFn, selector])

  useEffect(() => {
    unsubscribe.current = store.subscribe(() => updateStore())

    return () => {
      unsubscribe.current()
    }
  }, [updateStore])

  return result
}

/**
 * 这个Hook返回Redux store的dispatch引用。你可以使用它来 dispatch actions。
 */
export function useDispatch() {
  return useCallback((action) => {
    store.dispatch(action)
  }, [])
}

/**
 * 返回一个store引用。
 */
export function useStore() {
  return useMemo(() => {
    return store
  }, [])
}

export function useBindActionCreators(actionCreators) {
  const dispatch = useDispatch()
  return bindActionCreators(actionCreators, dispatch)
}