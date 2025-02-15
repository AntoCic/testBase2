import Firebase from "../personal_modules/Firebase.js";

export default class PersonalInfo extends Firebase {
    static mainPaths = "user/personalInfo"; // Definisci qui il mainPaths per firebase 

    constructor(personalInfo = {}) {
        super()
        const required = {
        };

        const optional = {
            userName: null,
        };

        // Costruisci l'oggetto usando il metodo build
        Firebase.build.call(this, personalInfo, required, optional);
    }

    // static async parse(res) {
    //     for (const key in res) {
    //         // res[key] = new Classe(res[key]);
    //         // await res[key].getFiles();
    //     }
    //     return res;
    // }
}