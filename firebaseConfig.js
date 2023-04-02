import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCj-mHvt8Spy7RzLVK3H3Vw9zUCKSar8jM',
  authDomain: 'app-meteor-to-do-list.firebaseapp.com',
  databaseURL: 'https://app-meteor-to-do-list-default-rtdb.firebaseio.com/',
  projectId: 'app-meteor-to-do-list',
  storageBucket: 'app-meteor-to-do-list.appspot.com',
  messagingSenderId: '53838976108',
  appId: '1:53838976108:web:92ab08609a2c704bb47449',
  measurementId: 'G-TJ91XX87CG',
};

export const app = initializeApp(firebaseConfig);
