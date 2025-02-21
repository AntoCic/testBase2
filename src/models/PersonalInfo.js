import UserDB from "../personal_modules/UserDB.js";

export default class PersonalInfo extends UserDB {
    static mainPaths = "personalInfo"; // Definisci qui il mainPaths per firebase 

    constructor(personalInfo = {}) {
        super()
        const required = {
        };

        const optional = {
            userName: null,
            name: null,
            surname: null,
            phoneNumber: null
        };

        // Costruisci l'oggetto usando il metodo build
        UserDB.build.call(this, personalInfo, required, optional);
    }

    // static async parse(res) {
    //     for (const key in res) {
    //         // res[key] = new Classe(res[key]);
    //         // await res[key].getFiles();
    //     }
    //     return res;
    // }
}