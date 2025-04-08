import { auth, provider, getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from '../firebase.js';
import PersonalInfo from '../models/PersonalInfo.js';
import { reactive } from 'vue'
import axios from 'axios'
import log from '../personal_modules/log.js';

export const user = reactive({

    providerInfo: null,
    isLogged: null,
    accessToken: '',
    uid: null,
    email: null,
    name: null,
    phoneNumber: null,
    photoURL: null,
    birthHideYear: null,
    dateOfBirth: null,
    gender: null,
    surname: null,

    personalInfo: new PersonalInfo().assignLocal(),

    checkLogged() {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                this.setter(currentUser);
                try {
                    const serverPersonalInfo = await new PersonalInfo().get();
                    if (serverPersonalInfo) {
                        serverPersonalInfo.saveLocal()
                        this.personalInfo = serverPersonalInfo
                        this.setter(currentUser);
                    }
                } catch (error) {
                    log.error('Errore personalInfo' + String(error));
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
    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout failed', error);
        }
        this.reset();
    },
    // Metodo per eseguire il logout
    setter(currentUser) {
        const { accessToken, uid, email, displayName, phoneNumber, photoURL } = currentUser;
        this.providerInfo = currentUser;
        this.isLogged = true;
        this.accessToken = accessToken;
        this.uid = uid;


        this.email = this.personalInfo?.email ?? email;
        this.name = this.personalInfo?.name ?? displayName;
        this.phoneNumber = this.personalInfo?.phoneNumber ?? phoneNumber;
        this.photoURL = this.personalInfo?.photoURL ?? photoURL;

        this.birthHideYear = this.personalInfo?.birthHideYear;
        this.dateOfBirth = this.personalInfo?.dateOfBirth;
        this.gender = this.personalInfo?.gender;
        this.surname = this.personalInfo?.surname;
        // store.loading.off();
    },
    // Metodo per eseguire il logout
    reset() {
        this.providerInfo = null;
        this.isLogged = false;
        this.accessToken = '';
        this.uid = null;
        this.email = null;
        this.name = null;
        this.phoneNumber = null;
        this.photoURL = null;

        this.birthHideYear = null;
        this.dateOfBirth = null;
        this.gender = null;
        this.surname = null;

        this.personalInfo?.deleteLocal();
        this.personalInfo = null;
        // store.loading.off();
    },


})