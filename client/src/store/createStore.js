import { applyMiddleware, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import createLogger from 'redux-logger'

export default (initialState = {}, history = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const logger = createLogger({
    level: 'log',
    duration: false, 
    timestamp: true, 
    logger: console,
    logErrors: true,
    diff: false,
  });

  let middleware = [thunk]
  if (process.env.NODE_ENV === 'development') middleware.push(logger)

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [persistState()]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  return store
}
