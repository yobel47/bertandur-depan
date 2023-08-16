import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBMWN8r5j2J3l96q33BJjjjQDmhen_iIak",
  authDomain: "push-notification-dc501.firebaseapp.com",
  projectId: "push-notification-dc501",
  storageBucket: "push-notification-dc501.appspot.com",
  messagingSenderId: "685051197232",
  appId: "1:685051197232:web:7e817e03efe7f815affaf5",
  measurementId: "G-GJLMJSMRXN",
};

function RequestPermission() {
  return new Promise((resolve, reject) => {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission == "granted") {
        console.log("Notification permission granted.");

        const app = initializeApp(firebaseConfig);

        // Initialize Firebase
        const messaging = getMessaging(app);

        getToken(messaging, { vapidKey: "BDlzXeuqkG5ySvuNacb7kd4lJUXRStb2Ya0hb2wXKG0YTYesa0DrRtuzYslDyTxKIMLoSqG3Efe7_peRW2EoG98" })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
              console.log("Firebase Token", currentToken);
              resolve(currentToken);
            } else {
              // Show permission request UI
              console.log("No registration token available. Request permission to generate one.");
              reject(new Error("No registration token available."));
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            reject(err);
            // ...
          });
      } else {
        console.log("Failed get token");
        reject(new Error("Failed to get token."));
      }
    });
  });
}

RequestPermission();
