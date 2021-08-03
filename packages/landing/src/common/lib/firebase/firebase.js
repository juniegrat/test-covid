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
export const { serverTimestamp, increment } = firebase.firestore.FieldValue;

export default firebase;
