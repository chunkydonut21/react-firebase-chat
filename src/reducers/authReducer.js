import { TYPES } from '../actions/types'

const INITIAL_STATE = {
  currentUser: null,
  authErrors: null
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return { ...state, currentUser: action.payload }
    case TYPES.CLEAR_USER:
      return { ...state, currentUser: null, authErrors: null }
    case TYPES.AUTH_ERROR:
      return { ...state, authErrors: action.payload }
    default:
      return state
  }
}

export default reducer
