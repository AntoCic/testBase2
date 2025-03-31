import {userDB} from "../personal_modules/mainsDB.js";
export default class PersonalInfo extends userDB {
    // Definisci il mainPath specifico per firebase.
    static mainPath = "personalInfo";

    constructor(data = {}) {
        super();
        const keys = [
            "name",
            "surname",
            "gender",
            "dateOfBirth",
            "birthHideYear",
            "email",
            "phoneNumber",
            "photoURL"
        ]
        for (const key of keys) {
            this[key] = data[key] !== undefined ? data[key] : null;
        }
    }
}