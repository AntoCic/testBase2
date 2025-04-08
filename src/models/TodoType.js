import {authDB} from "../personal_modules/mainsDB.js";
export default class TodoType extends authDB {
    // Definisci il mainPath specifico per firebase.
    static mainPath = "todoType";

    constructor(data = {}) {
        super();
    }
}
