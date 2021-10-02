import md5 from 'md5'
import firebase from '../utils/config'
import nanoid from 'nanoid'
import { TYPES } from './types'
import { message } from 'antd'
var unsubscribe
export const registerUser = (values) => async (dispatch) => {
  const { username, password, email } = values
  const db = firebase.firestore()

  try {
    const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password)

    await createdUser.user.updateProfile({
      displayName: username,
      photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
    })

    const { currentUser } = firebase.auth()

    await db.collection('users').doc(currentUser.uid).set({
      userId: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      avatar: currentUser.photoURL,
      favorites: null
    })

    await firebase.auth().signInWithEmailAndPassword(email, password)

    dispatch({ type: TYPES.SET_USER, payload: currentUser })
  } catch (err) {
    dispatch({ type: TYPES.AUTH_ERROR, payload: err.message })
  }
}

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      const { currentUser } = firebase.auth()
      dispatch({ type: TYPES.SET_USER, payload: currentUser })
    } catch (err) {
      dispatch({ type: TYPES.AUTH_ERROR, payload: err.message })
    }
  }

export const setUser = (user) => async (dispatch) => {
  dispatch({ type: TYPES.SET_USER, payload: user })
}

export const clearUser = () => async (dispatch) => {
  dispatch({ type: TYPES.CLEAR_USER })
}

export const signOutUser = () => async (dispatch) => {
  try {
    unsubscribe()
    await firebase.auth().signOut()
    dispatch({ type: TYPES.CLEAR_USER })
    dispatch({ type: TYPES.CLEAR_CHAT })
  } catch (err) {
    console.log(err)
  }
}

export const getCurrentUserInfo = (currentUserId) => async (dispatch) => {
  const db = firebase.firestore()

  const { currentUser } = firebase.auth()

  unsubscribe = db
    .collection('users')
    .doc(currentUser.uid)
    .onSnapshot((doc) => dispatch({ type: TYPES.CURENT_USER_INFO, payload: doc.data() }))

  // const p = await db.collection('users').doc(currentUser.uid).get()
  // dispatch({ type: TYPES.CURENT_USER_INFO, payload: p.data() })
}

// get all channels list
export const getAllChannels = () => async (dispatch) => {
  const db = firebase.firestore()

  db.collection('channels')
    .get()
    .onSnapshot((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ channelId: doc.id, ...doc.data() })
      })

      dispatch({ type: TYPES.GET_ALL_CHANNELS, payload: result })
    })
}

// create a new channel
export const addChannel = (channelName) => async (dispatch) => {
  const db = firebase.firestore()
  const { currentUser } = firebase.auth()

  const userObj = {
    userId: currentUser.uid,
    name: currentUser.displayName,
    email: currentUser.email,
    avatar: currentUser.photoURL
  }

  try {
    const res = await db.collection('channels').add({
      admin: currentUser.uid,
      channelName: channelName,
      users: firebase.firestore.FieldValue.arrayUnion(userObj),
      timestamp: new Date().getTime()
    })

    await db
      .collection('users')
      .doc(userObj.userId)
      .update({
        channels: firebase.firestore.FieldValue.arrayUnion({
          channelId: res.id,
          channelName
        })
      })

    message.success('Channel has been created.')

    dispatch({ type: TYPES.CHANNEL_ADDED })
  } catch (err) {
    message.error('This is an error while creating a channel.')
    dispatch({ type: TYPES.CHANNEL_ADD_FAILED })
  }
}

export const getChannelInfo = (channel) => async (dispatch) => {
  const db = firebase.firestore()

  db.collection('channels')
    .doc(channel.channelId)
    .onSnapshot((doc) => dispatch({ type: TYPES.CURRENT_CHANNEL_INFO, payload: { channelId: doc.id, ...doc.data() } }))
}

export const getAllUsers = () => async (dispatch) => {
  const db = firebase.firestore()

  db.collection('users').onSnapshot((querySnapshot) => {
    const result = []
    querySnapshot.forEach((doc) => result.push(doc.data()))
    dispatch({ type: TYPES.GET_ALL_USERS, payload: result })
  })
}

// get channels created by current logged in user
export const getAllChannelsAdmin = (currentUserId) => async (dispatch) => {
  const db = firebase.firestore()

  db.collection('channels')
    .where('admin', '==', currentUserId)
    .onSnapshot((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ channelId: doc.id, ...doc.data() })
      })
      dispatch({ type: TYPES.CHANNELS_BY_ADMIN, payload: result })
    })
}

// add to favourites by current logged in user
export const addChannelToFavorites = (channelObj) => async (dispatch) => {
  const db = firebase.firestore()
  const { currentUser } = firebase.auth()

  try {
    await db
      .collection('users')
      .doc(currentUser.uid)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(channelObj)
      })
    dispatch({ type: TYPES.ADD_CHANNEL_TO_FAV })
  } catch (err) {
    dispatch({ type: TYPES.ADD_CHANNEL_TO_FAV_ERROR })
  }
}

// remove channels marked as favorites
export const removeChannelFromFav = (channelObj) => async (dispatch) => {
  const db = firebase.firestore()
  const { currentUser } = firebase.auth()

  try {
    await db
      .collection('users')
      .doc(currentUser.uid)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(channelObj)
      })
    dispatch({ type: TYPES.REMOVE_CHANNEL_FROM_FAV })
  } catch (err) {
    dispatch({ type: TYPES.REMOVE_CHANNEL_FROM_FAV_ERROR })
  }
}

// add user to channel
export const addUserToChannel = (channelObj, userObj) => async (dispatch) => {
  const u = {
    userId: userObj.userId,
    name: userObj.name,
    email: userObj.email,
    avatar: userObj.avatar
  }

  const c = {
    channelId: channelObj.channelId,
    channelName: channelObj.channelName
  }

  const db = firebase.firestore()

  try {
    await db
      .collection('channels')
      .doc(c.channelId)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(u)
      })

    await db
      .collection('users')
      .doc(u.userId)
      .update({
        channels: firebase.firestore.FieldValue.arrayUnion(c)
      })
    dispatch({ type: TYPES.USER_ADDED_TO_CHANNEL })
  } catch (err) {
    dispatch({ type: TYPES.ERROR_ADDING_USER_TO_CHANNEL })
  }
}

// remove user from channel
export const removeUserFromChannel = (channelObj, userObj) => async (dispatch) => {
  const u = {
    userId: userObj.userId,
    name: userObj.name,
    email: userObj.email,
    avatar: userObj.avatar
  }

  const c = {
    channelId: channelObj.channelId,
    channelName: channelObj.channelName
  }

  const db = firebase.firestore()

  try {
    await db
      .collection('channels')
      .doc(c.channelId)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(u)
      })

    await db
      .collection('users')
      .doc(u.userId)
      .update({
        channels: firebase.firestore.FieldValue.arrayRemove(c)
      })
    dispatch({ type: TYPES.USER_REMOVED_FROM_CHANNEL })
  } catch (err) {
    dispatch({ type: TYPES.ERROR_REMOVING_USER_FROM_CHANNEL })
  }
}

// leave channel
export const leaveChannel = (channelObj, userObj) => async (dispatch) => {
  const u = {
    userId: userObj.userId,
    name: userObj.name,
    email: userObj.email,
    avatar: userObj.avatar
  }

  const c = {
    channelId: channelObj.channelId,
    channelName: channelObj.channelName
  }

  const db = firebase.firestore()

  try {
    await db
      .collection('users')
      .doc(u.userId)
      .update({
        channels: firebase.firestore.FieldValue.arrayRemove(c)
      })

    await db
      .collection('channels')
      .doc(c.channelId)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(u)
      })
    dispatch({ type: TYPES.USER_LEFT_FROM_CHANNEL })
  } catch (err) {
    dispatch({ type: TYPES.ERROR_REMOVING_USER_FROM_CHANNEL })
  }
}

// add message to channel
export const addMessage = (channelId, messageText) => async (dispatch) => {
  const db = firebase.firestore()
  const { currentUser } = firebase.auth()

  const messageSent = {
    text: messageText,
    createdAt: new Date().getTime(),
    user: {
      userId: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      avatar: currentUser.photoURL
    }
  }

  try {
    await db.collection('channelsChat').doc(channelId).collection('messages').add(messageSent)
    dispatch({ type: TYPES.MESSAGE_SENT })
  } catch (err) {
    dispatch({ type: TYPES.MESSAGE_SENT_FAILED })
  }
}

// list all messages from a channel
export const findAllMessagesByChannel = (channel) => async (dispatch) => {
  dispatch({ type: TYPES.CURRENT_CHANNEL, payload: channel })
  const db = firebase.firestore()

  db.collection('channelsChat')
    .doc(channel.channelId)
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })

      dispatch({ type: TYPES.MESSAGE_LIST, payload: result })
    })
}

// uploading images in message
export const uploadImage = (channelId, fileName) => async (dispatch) => {
  try {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    const file = nanoid()

    const result = await firebase.storage().ref('image').child(String(file)).put(fileName)
    const downloadUrl = await result.ref.getDownloadURL()

    const messageSent = {
      createdAt: new Date().getTime(),
      user: {
        userId: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        avatar: currentUser.photoURL
      },
      image: downloadUrl
    }

    await db.collection('channelsChat').doc(channelId).collection('messages').add(messageSent)

    dispatch({ type: TYPES.MESSAGE_SENT })
  } catch (err) {
    dispatch({ type: TYPES.MESSAGE_SENT_FAILED })
  }
}
