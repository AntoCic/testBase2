import UserDB from "../personal_modules/UserDB.js";
import { user } from "../stores/user.js";

export default class TodoType extends UserDB {
    static mainPaths = "TodoType"; // Definisci qui il mainPaths per firebase 

    constructor(personalInfo = {}) {
        super();
        // this._localStorage = personalInfo._localStorage !== undefined ? personalInfo._localStorage : null;
    }
}

