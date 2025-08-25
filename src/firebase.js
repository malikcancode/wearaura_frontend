// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCBbNSPg3RP_lEAhw-Kb2wKkKhiqFczLEw",
  authDomain: "ecommerce-notifications-c2ee2.firebaseapp.com",
  projectId: "ecommerce-notifications-c2ee2",
  storageBucket: "ecommerce-notifications-c2ee2.firebasestorage.app",
  messagingSenderId: "704255202850",
  appId: "1:704255202850:web:e48ccff5ea2495f4165c7b",
  measurementId: "G-XKVPNPNJNG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(app);

// Request permission & get FCM token
export const requestForToken = async () => {
  try {
    console.log("🚀 Requesting FCM token...");

    const currentToken = await getToken(messaging, {
      vapidKey:
        "BMJU5esVQdmDP6bLAiFmD5X2uhO-GRuSLJC7wjN7ro94Hh4P71QZVfcPLkaSza9iDpbQSCXO7v2qTyHoUdRDWHo", // ✅ your key here
    });

    if (currentToken) {
      console.log("✅ FCM Token:", currentToken);
      // 👉 Send this token to your backend and save it for admin/buyer
      return currentToken;
    } else {
      console.log("⚠️ No registration token available.");
    }
  } catch (err) {
    console.error("❌ An error occurred while retrieving token: ", err);
  }
};

// Listen for messages in foreground
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Message received: ", payload);
      resolve(payload);
    });
  });
