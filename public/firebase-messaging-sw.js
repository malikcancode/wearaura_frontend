// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCBbNSPg3RP_lEAhw-Kb2wKkKhiqFczLEw",
  authDomain: "ecommerce-notifications-c2ee2.firebaseapp.com",
  projectId: "ecommerce-notifications-c2ee2",
  storageBucket: "ecommerce-notifications-c2ee2.firebasestorage.app",
  messagingSenderId: "704255202850",
  appId: "1:704255202850:web:e48ccff5ea2495f4165c7b",
  measurementId: "G-XKVPNPNJNG",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message: ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png", // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
