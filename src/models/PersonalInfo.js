import UserDB from "../personal_modules/UserDB.js";
import { user } from "../stores/user.js";

export default class PersonalInfo extends UserDB {
    static mainPaths = "personalInfo"; // Definisci qui il mainPaths per firebase 

    constructor(personalInfo = {}) {
        super();
        this._localStorage = personalInfo._localStorage !== undefined ? personalInfo._localStorage : null;
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

    parse(res) {
        console.log(this.constructor.mainPaths, ' parse(res) ', res);
        if (res) {
            for (const key in res) { this[key] = res[key] };
            return this;
        }
        return res;
    }
}

