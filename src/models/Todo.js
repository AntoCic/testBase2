import {authDB} from "../personal_modules/mainsDB.js";
export default class Todo extends authDB {
    // Definisci il mainPath specifico per firebase.
    static mainPath = "todo";

    constructor(data = {}) {
        super();
    }
}
