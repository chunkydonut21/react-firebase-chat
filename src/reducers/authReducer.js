import { SET_USER, CLEAR_USER, AUTH_ERROR } from '../actions'

const INITIAL_STATE = {
    currentUser: null,
    authErrors: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, currentUser: action.payload }
        case CLEAR_USER:
            return { ...state, currentUser: null }
        case AUTH_ERROR:
            return { ...state, authErrors: action.payload }
        default:
            return state
    }
}

export default reducer
