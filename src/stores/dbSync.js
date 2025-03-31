import { reactive } from 'vue'
import axios from "axios";
import { user } from './user';
import log from '../personal_modules/log';

export const sanitazeMainPath = (mainPath) => mainPath.replace(/[.#$/\[\]]/g, "_");

class DbSync {
    static mainPath = "auth/dbSync";
    constructor(tables = {}) {
        for (const key in tables) {
            this[key] = tables[key];
        }
    }
    fullPath() { return `/api/${(this.constructor.mainPath)}`; }

    parse(res = {}) {
        for (const key in res) this[key] = res[key];
        return res;
    }

    async get() {
        return axios.get(this.fullPath(), {
            headers: { authorization: user.accessToken }
        }).then(res => {
            this.parse(res.data);
            return this;
        }).catch(log.error);
    }

    async update(tabPathm, newData) {
        const updatedData = { [sanitazeMainPath(tabPathm)]: newData }
        Object.assign(this, updatedData);
        this.saveToLocal();
        return axios.put(this.fullPath(), updatedData, {
            headers: { authorization: user.accessToken }
        }).then(res => {
            return this;
        }).catch(log.error);
    }

    saveToLocal() {
        localStorage.setItem('dbSync', JSON.stringify(this));
    }

    loadFromLocal() {
        const data = localStorage.getItem('dbSync');
        if (data) { this.parse(JSON.parse(data)) };
        return this
    }

    // start() {
    //     if (store.repeatSync.state) {
    //         await store.SYNC()
    //         const fixBugHeaderTitle = store.headerTitle

    //         if (store.routeName !== 'calendar') {
    //             store.headerTitle = fixBugHeaderTitle;
    //         } else {
    //             store.calendar.generateCalendar();
    //         }

    //         setTimeout(store.repeatSync.start, (3 * 1000));
    //     }
    //     this.state = true
    //     store.repeatSync.action()
    // },
    // stop() {
    //     this.state = false
    // },
}

export const dbSync = reactive(new DbSync().loadFromLocal());