import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import sticker from './sticker'
import stories from './stories'
import allPages from './pages'
import singleStory from './singleStory'
import singlePageReducer from './singlePage'

const reducer = combineReducers({
  user,
  sticker,
  stories,
  singleStory,
  allPages,
  singlePageReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './stories'
export * from './pages'
export * from './sticker'
