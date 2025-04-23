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


    async tableToUpdate() {
        return axios.get(this.fullPath(), {
            headers: { authorization: user.accessToken }
        }).then(res => {
            const dbSyncServer = res.data;
            const tableToSync = []

            for (const tabNameKey in dbSyncServer) {
                if (this?.[tabNameKey]?.updatedAt !== undefined) {
                    if (!dbSyncServer[tabNameKey]?.updatedAt) { log.error(`La tabella ${tabNameKey} non aveva updatedAt`); }
                    const lastUpdateServer = new Date(dbSyncServer[tabNameKey]?.updatedAt ?? 0);
                    const lastUpdateLocal = new Date(this[tabNameKey].updatedAt);

                    if (lastUpdateServer > lastUpdateLocal) {
                        tableToSync.push(tabNameKey);
                    } else {
                        // Se la data del server è più vecchia o uguale a quella locale, non fare nulla
                        // console.log(`La tabella ${tabNameKey} è già aggiornata`);
                    }
                } else {
                    tableToSync.push(tabNameKey);
                }
            }
            if (!!tableToSync?.length) {
                this.parse(res.data);
                this.saveToLocal();
            }
            return tableToSync ?? [];
        })
    }

    syncTab(tabNameKey) {
        const functionToGetAndSync = this.tableToSync[tabNameKey];
        if (!functionToGetAndSync) {
            log.error(`La tabella ${tabNameKey} non è presente in tableToSync`);
            return
        }
        functionToGetAndSync();
    }

    async get() {
        return axios.get(this.fullPath(), {
            headers: { authorization: user.accessToken }
        }).then(res => {
            this.parse(res.data);
            this.saveToLocal();
            return this;
        })
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

    deleteLocal(key) {
        if (this?.[key] !== undefined) { delete this?.[key]; }
        this.saveToLocal();
    }

    saveToLocal() {
        localStorage.setItem('dbSync', JSON.stringify(this));
    }

    loadFromLocal() {
        const data = localStorage.getItem('dbSync');
        if (data) { this.parse(JSON.parse(data)) };
        return this
    }

    clearLocal() {
        localStorage.removeItem('dbSync');
        return this;
    }

}

export const dbSync = reactive(new DbSync().loadFromLocal());