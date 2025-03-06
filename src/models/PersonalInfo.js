import UserDB from "../personal_modules/UserDB.js";
import { user } from "../stores/user.js";

export default class PersonalInfo extends UserDB {
    static mainPaths = "personalInfo"; // Definisci qui il mainPaths per firebase 

    constructor(personalInfo = {}) {
        super()
        const required = {
        };

        const optional = {
            name: null,
            surname: null,
            gender: null,
            dateOfBirth: null,
            birthHideYear: null,
            email: null,
            phoneNumber: null,
            photoURL: null,
        };

        // Costruisci l'oggetto usando il metodo build
        UserDB.build.call(this, personalInfo, required, optional);
    }

    async parse(res) {
        if (res) {
            for (const key in res) { this[key] = res[key]; }
            if (this.name === null && this.surname === null && user.displayName) {
                const nameParts = user.displayName.split(' ');
                if (nameParts.length >= 2) {
                    this.name = nameParts[0]; // Primo elemento
                    this.surname = nameParts.slice(1).join(' '); // Il resto
                } 
            }
            if(this.email === null && user.email){ this.email = user.email}
            if(this.phoneNumber === null && user.phoneNumber){ this.phoneNumber = user.phoneNumber}
            if(user.photoURL){ this.photoURL = user.photoURL}
            
            if (!this.id) { this.id = this.constructor.mainPaths }
            return this;
        }
        return res;
    }
}

