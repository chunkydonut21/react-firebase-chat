import { TYPES } from '../actions/types'

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
    case TYPES.CURENT_USER_INFO:
      return { ...state, currentProfile: action.payload }
    case TYPES.GET_ALL_CHANNELS:
      return { ...state, channelList: action.payload }
    case TYPES.MESSAGE_LIST:
      return { ...state, messageList: action.payload }
    case TYPES.CHANNEL_ADDED:
      return { ...state, channelAdded: true }
    case TYPES.CHANNEL_ADD_FAILED:
      return { ...state, channelFailed: true }
    case TYPES.CHANNELS_BY_ADMIN:
      return { ...state, channelsByAdmin: action.payload }
    case TYPES.USER_ADDED_TO_CHANNEL:
      return { ...state, userAddedToChannel: true }
    case TYPES.ERROR_ADDING_USER_TO_CHANNEL:
      return { ...state, userAddedToChannelFailed: true }
    case TYPES.USER_REMOVED_FROM_CHANNEL:
      return { ...state, userRemovedFromChannel: true }
    case TYPES.ERROR_REMOVING_USER_FROM_CHANNEL:
      return { ...state, userRemovedFromChannelError: true }
    case TYPES.ADD_CHANNEL_TO_FAV:
      return { ...state, channelAddedToFav: true }
    case TYPES.ADD_CHANNEL_TO_FAV_ERROR:
      return { ...state, channelAddedToFavError: true }
    case TYPES.REMOVE_CHANNEL_FROM_FAV:
      return { ...state, channelRemovedFromFav: true }
    case TYPES.REMOVE_CHANNEL_FROM_FAV_ERROR:
      return { ...state, channelRemovedFromFavError: true }
    case TYPES.CURRENT_CHANNEL:
      return { ...state, currentChannel: action.payload }
    case TYPES.CURRENT_CHANNEL_INFO:
      return { ...state, currentChannelInfo: action.payload }
    case TYPES.GET_ALL_USERS:
      return { ...state, allUsers: action.payload }
    case TYPES.CLEAR_USER:
      return INITIAL_STATE
    default:
      return state
  }
}

export default reducer
