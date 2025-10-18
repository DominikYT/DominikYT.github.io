// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6cwSZGJVq3XbH1mN09oidwr1MkfCbN9Q",
  authDomain: "dominikytgithubio-pro.firebaseapp.com",
  projectId: "dominikytgithubio-pro",
  storageBucket: "dominikytgithubio-pro.firebasestorage.app",
  messagingSenderId: "997619191377",
  appId: "1:997619191377:web:71b1d7367b1ab7fdbff270"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
