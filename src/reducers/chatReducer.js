import {
    CHANNEL_ADDED,
    CHANNEL_ADD_FAILED,
    CHANNELS_BY_ADMIN,
    USER_ADDED_TO_CHANNEL,
    ERROR_ADDING_USER_TO_CHANNEL,
    USER_REMOVED_FROM_CHANNEL,
    ERROR_REMOVING_USER_FROM_CHANNEL,
    ADD_CHANNEL_TO_FAV,
    ADD_CHANNEL_TO_FAV_ERROR,
    REMOVE_CHANNEL_FROM_FAV,
    REMOVE_CHANNEL_FROM_FAV_ERROR,
    GET_ALL_CHANNELS,
    CURENT_USER_INFO,
    MESSAGE_LIST,
    CURRENT_CHANNEL,
    CURRENT_CHANNEL_INFO,
    GET_ALL_USERS,
    CLEAR_USER
} from '../actions'

const INITIAL_STATE = {
    channelList: null,
    currentProfile: null,
    messageList: null,
    channelAdded: false,
    channelFailed: false,
    channelsByAdmin: [],
    userAddedToChannel: false,
    userAddedToChannelFailed: false,
    userRemovedFromChannel: false,
    userRemovedFromChannelError: false,
    channelAddedToFav: false,
    channelAddedToFavError: false,
    channelRemovedFromFav: false,
    channelRemovedFromFavError: false,
    currentChannelInfo: null,
    allUsers: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CURENT_USER_INFO:
            return { ...state, currentProfile: action.payload }
        case GET_ALL_CHANNELS:
            return { ...state, channelList: action.payload }
        case MESSAGE_LIST:
            return { ...state, messageList: action.payload }
        case CHANNEL_ADDED:
            return { ...state, channelAdded: true }
        case CHANNEL_ADD_FAILED:
            return { ...state, channelFailed: true }
        case CHANNELS_BY_ADMIN:
            return { ...state, channelsByAdmin: action.payload }
        case USER_ADDED_TO_CHANNEL:
            return { ...state, userAddedToChannel: true }
        case ERROR_ADDING_USER_TO_CHANNEL:
            return { ...state, userAddedToChannelFailed: true }
        case USER_REMOVED_FROM_CHANNEL:
            return { ...state, userRemovedFromChannel: true }
        case ERROR_REMOVING_USER_FROM_CHANNEL:
            return { ...state, userRemovedFromChannelError: true }
        case ADD_CHANNEL_TO_FAV:
            return { ...state, channelAddedToFav: true }
        case ADD_CHANNEL_TO_FAV_ERROR:
            return { ...state, channelAddedToFavError: true }
        case REMOVE_CHANNEL_FROM_FAV:
            return { ...state, channelRemovedFromFav: true }
        case REMOVE_CHANNEL_FROM_FAV_ERROR:
            return { ...state, channelRemovedFromFavError: true }
        case CURRENT_CHANNEL:
            return { ...state, currentChannel: action.payload }
        case CURRENT_CHANNEL_INFO:
            return { ...state, currentChannelInfo: action.payload }
        case GET_ALL_USERS:
            return { ...state, allUsers: action.payload }
        case CLEAR_USER:
            return INITIAL_STATE
        default:
            return state
    }
}

export default reducer
