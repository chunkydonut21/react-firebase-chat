import md5 from 'md5'
import firebase from '../utils/config'
import nanoid from 'nanoid'

export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const CHANNEL_ADDED = 'CHANNEL_ADDED'
export const CHANNEL_ADD_FAILED = 'CHANNEL_ADDED_FAILED'
export const CHANNELS_BY_ADMIN = 'CHANNELS_BY_ADMIN'

export const CURENT_USER_INFO = 'CURENT_USER_INFO'

export const USER_ADDED_TO_CHANNEL = 'USER_ADDED_TO_CHANNEL'
export const ERROR_ADDING_USER_TO_CHANNEL = 'ERROR_ADDING_USER_TO_CHANNEL'

export const USER_REMOVED_FROM_CHANNEL = 'USER_REMOVED_FROM_CHANNEL'
export const ERROR_REMOVING_USER_FROM_CHANNEL = 'ERROR_REMOVING_USER_FROM_CHANNEL'

export const ADD_CHANNEL_TO_FAV = 'ADD_CHANNEL_TO_FAV'
export const ADD_CHANNEL_TO_FAV_ERROR = 'ADD_CHANNEL_TO_FAV'
export const REMOVE_CHANNEL_FROM_FAV = 'REMOVE_CHANNEL_FROM_FAV'
export const REMOVE_CHANNEL_FROM_FAV_ERROR = 'REMOVE_CHANNEL_FROM_FAV'

export const GET_ALL_CHANNELS = 'GET_ALL_CHANNELS'
export const MESSAGE_SENT = 'MESSAGE_SENT'
export const MESSAGE_SENT_FAILED = 'MESSAGE_SENT_FAILED'
export const MESSAGE_LIST = 'MESSAGE_LIST'

export const CURRENT_CHANNEL = 'CURRENT_CHANNEL'
export const CURRENT_CHANNEL_INFO = 'CURRENT_CHANNEL_INFO'
export const GET_ALL_USERS = 'GET_ALL_USERS'

export const registerUser = values => async dispatch => {
    const { username, password, email } = values
    const db = firebase.firestore()

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
            createdUser.user
                .updateProfile({
                    displayName: username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    const { currentUser } = firebase.auth()

                    db.collection('users')
                        .doc(currentUser.uid)
                        .set({
                            userId: currentUser.uid,
                            name: currentUser.displayName,
                            email: currentUser.email,
                            avatar: currentUser.photoURL,
                            favorites: null
                        })
                        .then(() => dispatch({ type: SET_USER, payload: currentUser }))
                        .catch(err => dispatch({ type: AUTH_ERROR, payload: err.message }))
                })
                .catch(err => dispatch({ type: AUTH_ERROR, payload: err.message }))
        })
        .catch(err => dispatch({ type: AUTH_ERROR, payload: err.message }))
}

export const loginUser = ({ email, password }) => async dispatch => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            const { currentUser } = firebase.auth()

            console.log(currentUser, 'BOYAAAAAAAA')
            dispatch({ type: SET_USER, payload: currentUser })
        })
        .catch(err => dispatch({ type: AUTH_ERROR, payload: err.message }))
}

export const setUser = user => async dispatch => {
    dispatch({ type: SET_USER, payload: user })
}

export const clearUser = () => async dispatch => {
    dispatch({ type: CLEAR_USER })
}

export const signOutUser = () => async dispatch => {
    await firebase.auth().signOut()
    dispatch({ type: CLEAR_USER })
}

export const getCurrentUserInfo = currentUserId => async dispatch => {
    const db = firebase.firestore()

    db.collection('users')
        .doc(currentUserId)
        .onSnapshot(doc => dispatch({ type: CURENT_USER_INFO, payload: doc.data() }))
}

// get all channels list
export const getAllChannels = () => async dispatch => {
    const db = firebase.firestore()

    db.collection('channels')
        .get()
        .onSnapshot(querySnapshot => {
            const result = []
            querySnapshot.forEach(doc => {
                result.push({ channelId: doc.id, ...doc.data() })
            })

            dispatch({ type: GET_ALL_CHANNELS, payload: result })
        })
}

// create a new channel
export const addChannel = channelName => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    const userObj = {
        userId: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        avatar: currentUser.photoURL
    }

    db.collection('channels')
        .add({
            admin: currentUser.uid,
            channelName: channelName,
            users: firebase.firestore.FieldValue.arrayUnion(userObj),
            timestamp: new Date().getTime()
        })
        .then(res => {
            db.collection('users')
                .doc(userObj.userId)
                .update({
                    channels: firebase.firestore.FieldValue.arrayUnion({
                        channelId: res.id,
                        channelName
                    })
                })
                .then(res => dispatch({ type: CHANNEL_ADDED }))
        })
        .catch(err => dispatch({ type: CHANNEL_ADD_FAILED }))
}

export const getChannelInfo = channel => async dispatch => {
    const db = firebase.firestore()

    db.collection('channels')
        .doc(channel.channelId)
        .onSnapshot(doc => dispatch({ type: CURRENT_CHANNEL_INFO, payload: { channelId: doc.id, ...doc.data() } }))
}

export const getAllUsers = () => async dispatch => {
    const db = firebase.firestore()

    db.collection('users').onSnapshot(querySnapshot => {
        const result = []
        querySnapshot.forEach(doc => result.push(doc.data()))
        dispatch({ type: GET_ALL_USERS, payload: result })
    })
}

// get channels created by current logged in user
export const getAllChannelsAdmin = currentUserId => async dispatch => {
    const db = firebase.firestore()

    db.collection('channels')
        .where('admin', '==', currentUserId)
        .onSnapshot(querySnapshot => {
            const result = []
            querySnapshot.forEach(doc => {
                result.push({ channelId: doc.id, ...doc.data() })
            })
            dispatch({ type: CHANNELS_BY_ADMIN, payload: result })
        })
}

// get channels marked as favorites by current logged in user
export const addChannelToFavorites = channelObj => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('users')
        .doc(currentUser.uid)
        .update({
            favorites: firebase.firestore.FieldValue.arrayUnion(channelObj)
        })
        .then(res => dispatch({ type: ADD_CHANNEL_TO_FAV }))
        .catch(err => dispatch({ type: ADD_CHANNEL_TO_FAV_ERROR }))
}

// remove channels marked as favorites
export const removeChannelFromFav = channelObj => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('users')
        .doc(currentUser.uid)
        .update({
            favorites: firebase.firestore.FieldValue.arrayRemove(channelObj)
        })
        .then(res => dispatch({ type: REMOVE_CHANNEL_FROM_FAV }))
        .catch(err => dispatch({ type: REMOVE_CHANNEL_FROM_FAV_ERROR }))
}

// add user to channel
export const addUserToChannel = (channelObj, userObj) => async dispatch => {
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

    db.collection('channels')
        .doc(c.channelId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion(u)
        })
        .then(res => {
            db.collection('users')
                .doc(u.userId)
                .update({
                    channels: firebase.firestore.FieldValue.arrayUnion(c)
                })
                .then(() => dispatch({ type: USER_ADDED_TO_CHANNEL }))
                .catch(() => dispatch({ type: ERROR_ADDING_USER_TO_CHANNEL }))
        })
        .catch(() => dispatch({ type: ERROR_ADDING_USER_TO_CHANNEL }))
}

// remove user from channel
export const removeUserFromChannel = (channelObj, userObj) => async dispatch => {
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

    db.collection('channels')
        .doc(c.channelId)
        .update({
            users: firebase.firestore.FieldValue.arrayRemove(u)
        })
        .then(res => {
            db.collection('users')
                .doc(u.userId)
                .update({
                    channels: firebase.firestore.FieldValue.arrayRemove(c)
                })
                .then(() => dispatch({ type: USER_REMOVED_FROM_CHANNEL }))
                .catch(() => dispatch({ type: ERROR_REMOVING_USER_FROM_CHANNEL }))
        })
        .catch(() => dispatch({ type: ERROR_REMOVING_USER_FROM_CHANNEL }))
}

// leave channel
export const leaveChannel = (channelObj, userObj) => async dispatch => {
    console.log(channelObj, userObj, 'XXXXXXXX')
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

    db.collection('channels')
        .doc(c.channelId)
        .update({
            users: firebase.firestore.FieldValue.arrayRemove(u)
        })
        .then(res => {
            db.collection('users')
                .doc(u.userId)
                .update({
                    channels: firebase.firestore.FieldValue.arrayRemove(c)
                })
                .then(() => dispatch({ type: USER_REMOVED_FROM_CHANNEL }))
                .catch(() => dispatch({ type: ERROR_REMOVING_USER_FROM_CHANNEL }))
        })
        .catch(() => dispatch({ type: ERROR_REMOVING_USER_FROM_CHANNEL }))
}

// add message to channel
export const addMessage = (channelId, messageText) => async dispatch => {
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

    console.log(messageSent, 'NANO')

    db.collection('channelsChat')
        .doc(channelId)
        .collection('messages')
        .add(messageSent)
        .then(res => dispatch({ type: MESSAGE_SENT }))
        .catch(err => dispatch({ type: MESSAGE_SENT_FAILED }))
}

// list all messages from a channel
export const findAllMessagesByChannel = channel => async dispatch => {
    dispatch({ type: CURRENT_CHANNEL, payload: channel })
    const db = firebase.firestore()

    db.collection('channelsChat')
        .doc(channel.channelId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(querySnapshot => {
            const result = []
            querySnapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })

            dispatch({ type: MESSAGE_LIST, payload: result })
        })
}

// uploading images in message
export const uploadImage = (channelId, fileName) => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    const file = nanoid()

    firebase
        .storage()
        .ref('image')
        .child(String(file))
        .put(fileName)
        .then(result => {
            result.ref.getDownloadURL().then(downloadUrl => {
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

                db.collection('channelsChat')
                    .doc(channelId)
                    .collection('messages')
                    .add(messageSent)
                    .then(() => dispatch({ type: MESSAGE_SENT }))
                    .catch(err => dispatch({ type: MESSAGE_SENT_FAILED }))
            })
        })
}
