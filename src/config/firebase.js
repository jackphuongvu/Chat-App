import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBkkRqMKFuunk-iOLHOnSPke04FMpE8wWg",
  authDomain: "my-chat-app-7df02.firebaseapp.com",
  databaseURL: "https://my-chat-app-7df02.firebaseio.com",
  projectId: "my-chat-app-7df02",
  storageBucket: "my-chat-app-7df02.appspot.com",
  messagingSenderId: "519261285140"
};
firebase.initializeApp(config);

export default firebase;

/*
apiKey: "AIzaSyBkkRqMKFuunk-iOLHOnSPke04FMpE8wWg",
authDomain: "my-chat-app-7df02.firebaseapp.com",
databaseURL: "https://my-chat-app-7df02.firebaseio.com",
projectId: "my-chat-app-7df02",
storageBucket: "my-chat-app-7df02.appspot.com",
messagingSenderId: "519261285140"
*/