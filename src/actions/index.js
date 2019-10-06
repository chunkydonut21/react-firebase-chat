import md5 from 'md5'
import firebase from 'firebase'
import 'firebase/firestore'
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
                            avatar: currentUser.photoURL
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

export const getCurrentUserInfo = () => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('users')
        .doc(currentUser.uid)
        .onSnapshot(doc => dispatch({ type: CURENT_USER_INFO, payload: doc.data() }))
}

// get all channels list
export const getAllChannels = () => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('channels')
        .get()
        .onSnapshot(querySnapshot => {
            const result = []
            querySnapshot.forEach(doc => {
                result.push(doc.data())
            })

            dispatch({ type: GET_ALL_CHANNELS, payload: result })
        })
}

// create a new channel
export const addChannel = channelName => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('channels')
        .add({
            admin: currentUser.uid,
            channelName: channelName,
            timestamp: new Date().getTime()
        })
        .then(res => dispatch({ type: CHANNEL_ADDED }))
        .catch(err => dispatch({ type: CHANNEL_ADD_FAILED }))
}

// get channels created by current logged in user
export const getAllChannelsAdmin = () => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('channels')
        .where('admin', '==', currentUser.uid)
        .onSnapshot(querySnapshot => {
            const result = []
            querySnapshot.forEach(doc => {
                result.push(doc.data())
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

// addu user to channel
export const addUserToChannel = (channelObj, userObj) => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('channels')
        .doc(channelObj.name)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion(userObj)
        })
        .then(res => {
            db.collection('users')
                .doc(userObj.userId)
                .update({
                    channels: firebase.firestore.FieldValue.arrayUnion(channelObj)
                })
                .then(() => dispatch({ type: USER_ADDED_TO_CHANNEL }))
                .catch(() => dispatch({ type: ERROR_ADDING_USER_TO_CHANNEL }))
        })
        .catch(() => dispatch({ type: ERROR_ADDING_USER_TO_CHANNEL }))
}

// remove user from channel
export const removeUserFromChannel = (channelObj, userObj) => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('channels')
        .doc(channelObj.name)
        .update({
            users: firebase.firestore.FieldValue.arrayRemove(userObj)
        })
        .then(res => {
            db.collection('users')
                .doc(userObj.userId)
                .update({
                    channels: firebase.firestore.FieldValue.arrayRemove(channelObj)
                })
                .then(() => dispatch({ type: USER_REMOVED_FROM_CHANNEL }))
                .catch(() => dispatch({ type: ERROR_REMOVING_USER_FROM_CHANNEL }))
        })
        .catch(() => dispatch({ type: ERROR_REMOVING_USER_FROM_CHANNEL }))
}

// add message to channel
export const addMessage = (channelId, message) => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    const messageSent = {
        text: message.text,
        createdAt: new Date().getTime(),
        user: {
            userId: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            avatar: currentUser.photoURL
        }
    }

    db.collection('messages')
        .doc(channelId)
        .add(messageSent)
        .then(res => dispatch({ type: MESSAGE_SENT }))
        .catch(err => dispatch({ type: MESSAGE_SENT_FAILED }))
}

// list all messages from a channel
export const findAllMessagesByChannel = channelId => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    db.collection('messages')
        .doc(channelId)
        .onSnapshot(doc => dispatch({ type: MESSAGE_LIST, payload: doc.data() }))
}

export const uploadImage = (uri, userId) => async dispatch => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    const file = nanoid()

    firebase
        .storage()
        .ref('image')
        .child(String(file))
        .putString(uri, 'base64', { contentType: 'image/jpg' })
        .then(result => {
            result.ref.getDownloadURL().then(downloadUrl => {
                const db = firebase.firestore()

                const image = {
                    _id: String(file),
                    createdAt: new Date().getTime(),
                    user: {
                        userId: currentUser.uid,
                        name: currentUser.displayName,
                        email: currentUser.email,
                        avatar: currentUser.photoURL
                    },
                    image: downloadUrl
                }

                db.collection('messages')
                    .add(image)
                    .then(() => dispatch({ type: MESSAGE_SENT }))
                    .catch(err => dispatch({ type: MESSAGE_SENT_FAILED }))
            })
        })
}
