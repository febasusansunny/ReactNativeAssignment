import firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig ={
    apiKey: 'AIzaSyDhNCWVjOomX9TSr42jSjlTt2Z2U0-KC14',
    authDomain: 'todowithreactnative.firebaseapp.com',
    databaseURL: 'https://todowithreactnative-default-rtdb.firebaseio.com/s',
    projectId: 'todowithreactnative',
    storageBucket: 'todowithreactnative.appspot.com',
    messagingSenderId: '639739652857',
    appId: '1:639739652857:android:e890735296aa75142f1028',
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  } 
  
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
const providers = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithFacebook = () => auth.signInWithPopup(providers);



  export {firebase};