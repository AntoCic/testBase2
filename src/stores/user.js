import { auth, provider, getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from '../firebase.js';
import PersonalInfo from '../models/PersonalInfo.js';
import { reactive } from 'vue'
import axios from 'axios'

export const user = reactive({
    accessToken: null,
    uid: null,
    email: null,
    displayName: null,
    phoneNumber: null,
    photoURL: null,

    personalInfo: new PersonalInfo(),
    // personalInfo: {
    //     all: null,
    
    //     async get() {
    //         console.log(await personalInfo.get())
    //         return
    //     },
    
    //     async add(newItem) {
    //         const added = await Item.add(newItem, true);
    //         if (added) {
    //             this.all = { ...this.all, ...added }
    //         } else {
    //             console.error('Errore adding item');
    //         }
    //     },
    
    // },

    checkLogged() {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const { accessToken, uid, email, displayName, phoneNumber, photoURL } = currentUser;
                this.accessToken = accessToken;
                this.uid = uid;
                this.email = email;
                this.displayName = displayName;
                this.phoneNumber = phoneNumber;
                this.photoURL = photoURL;

                console.log(this.displayName);
                console.log(this.personalInfo);
                
                try {
                    await this.personalInfo?.init();
                } catch (error) {
                    console.error('Errore personalInfo.init: ', error);
                }

                // store.loading.off();
            } else {
                this.reset();
            }
        });
    },

    // Metodo per eseguire il login
    async login(email, password) {
        try {
            // store.loading.on();
            await signInWithEmailAndPassword(auth, email, password);
            return true
        } catch (error) {
            this.reset();
            console.error('Login failed', error);
            return false
        }
    },
    async googleLogin() {
        try {
            // store.loading.on();
            await signInWithPopup(auth, provider);
            return true
        } catch (error) {
            this.reset();
            console.error('Login failed', error);
            return false
        }
    },
    // Metodo per eseguire il register
    async register(userName, email, password) {
        try {
            // store.loading.on();
            this.userName = userName
            await createUserWithEmailAndPassword(auth, email, password);
            return true
        } catch (error) {
            this.reset();
            console.error('Error registering:', error);
            alert('Registration failed. Please try again.');
            return false
        }
    },

    resetPassword(email) {
        if (email.trim() === '') {
            alert("Inserisci l'email per recuperare la password.");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Email per il reset della password inviata.");
            })
            .catch((error) => {
                alert(error.message);
                // store.loading.off();
                console.error("Errore di reset della password:", error);
            });
    },
    // Metodo per eseguire il logout
    async getPersonalInfo() {
        // store.loading.on();
        return await axios.get('/api/user/personalInfo', {
            headers: {
                "Authorization": this.accessToken
            }
        })
            .then(async (res) => {
                this.personalInfo = res.data
                console.log({ personalInfo: this.personalInfo });
                return this.personalInfo
            })
            .catch((error) => {
                console.error(error)
                // store.loading.off();
                return null
            })


    },
    // Metodo per eseguire il logout
    async addUserName(userName) {
        // store.loading.on();

        const id = 'userName'
        const data = userName

        return await axios.post('/api/a/userdata', { id, data }, {
            headers: {
                "Authorization": this.accessToken
            }
        })
            .then((res) => {
                if (res.data.userName) {
                    return res.data.userName
                } else {
                    return null
                }
            })
            .catch((error) => {
                console.error(error)
                // store.loading.off();
                return null
            })

    },
    // Metodo per eseguire il logout
    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout failed', error);
        }
        this.reset();
    },
    // Metodo per eseguire il logout
    reset() {
        this.accessToken = false;
        this.uid = null;
        this.email = null;
        this.displayName = null;
        this.phoneNumber = null;
        this.photoURL = null;
        personalInfo = null;
        // store.loading.off();
    },


})