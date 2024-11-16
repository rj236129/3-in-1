// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4G7p2c2_xl1JUsGEZSugoeaMRlCMaJvY",
    authDomain: "job-seekar-3ce26.firebaseapp.com",
    projectId: "job-seekar-3ce26",
    storageBucket: "job-seekar-3ce26.firebasestorage.app",
    messagingSenderId: "1044887792058",
    appId: "1:1044887792058:web:0b188caec2b4a15eecd583",
    measurementId: "G-N88CBF3DFQ"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerButton = document.getElementById('register-button');
const registerErrorMessage = document.getElementById('register-error-message');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const loginErrorMessage = document.getElementById('login-error-message');

// Registration Logic
registerButton.addEventListener('click', () => {
    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();

    if (!name || !email || !password) {
        registerErrorMessage.textContent = 'Please fill all fields.';
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            user.updateProfile({ displayName: name })
                .then(() => {
                    db.collection('users').doc(user.uid).set({
                        name: name,
                        email: email,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    alert(`Registration successful! Welcome, ${name}`);
                });
        })
        .catch(error => {
            registerErrorMessage.textContent = error.message;
        });
});

// Login Logic
loginButton.addEventListener('click', () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
        loginErrorMessage.textContent = 'Please fill all fields.';
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            alert(`Welcome back, ${user.email}!`);
        })
        .catch(error => {
            loginErrorMessage.textContent = error.message;
        });
});
