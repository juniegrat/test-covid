import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import 'firebase/analytics';
import firebaseConfig from './firebase.config';

export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const { serverTimestamp } = firebase.firestore.FieldValue;
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);

export default firebase;

const EMULATORS_STARTED = 'EMULATORS_STARTED';
function startEmulators() {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true;
    firebase.firestore().useEmulator('localhost', 8080);
    firebase.functions().useEmulator('localhost', 5001);
  }
}

if (process.env.NODE_ENV === 'development') {
  startEmulators();
}
