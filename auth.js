import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Rejestracja
export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const accountNumber = "DEMO" + Math.floor(1000000000 + Math.random() * 9000000000);

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      accountNumber: accountNumber
    });

    alert("Rejestracja zakończona! Twój numer konta demo: " + accountNumber);
  } catch (error) {
    alert(error.message);
  }
}

// Logowanie
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    alert(error.message);
  }
}

// Pobranie numeru konta
export async function getAccountNumber(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().accountNumber;
  } else {
    return null;
  }
}
