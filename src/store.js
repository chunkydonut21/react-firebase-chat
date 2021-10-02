import { createStore, compose, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  )
)

export default store
