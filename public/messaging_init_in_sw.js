import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBMWN8r5j2J3l96q33BJjjjQDmhen_iIak",
  authDomain: "push-notification-dc501.firebaseapp.com",
  projectId: "push-notification-dc501",
  storageBucket: "push-notification-dc501.appspot.com",
  messagingSenderId: "685051197232",
  appId: "1:685051197232:web:7e817e03efe7f815affaf5",
  measurementId: "G-GJLMJSMRXN",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
