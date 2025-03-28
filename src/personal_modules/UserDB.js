import axios from "axios";
import { user } from "../stores/user";
import log from "./log";
import u from '../utility.js';

export default class UserDB {
    static build(item, required = {}, optional = {}) {
        for (const key in { ...required, ...optional }) {
            this[key] = item[key] ?? required[key] ?? optional[key];
        }
    }

    parse(res) {
        console.log(this.constructor.mainPaths, ' parse(res) ', res);
        if (res) {
            for (const key in res) { this[key] = res[key] }
            return this;
        }
        return res;
    }

    async init() {
        return (this._localStorage && this._localStorage === false) ? this : await this.get();
    }

    localStorageGet() {
        const localData = localStorage.getItem(this.constructor.mainPaths);
        if (localData) { return { ...(JSON.parse(localData)), _localStorage: true }; }
        return undefined;
    }
    localStorageInit() {
        const localData = this.localStorageGet();
        if (localData) { return this.parse(localData); }
        return undefined;
    }
    localStorageSave(objectToSave = this) {
        return localStorage.setItem(this.constructor.mainPaths, JSON.stringify({ ...objectToSave, _localStorage: true }));
    }
    localStorageDelete() {
        if (localStorage.getItem(this.constructor.mainPaths)) {
            localStorage.removeItem(this.constructor.mainPaths);
        }
    }
    canSet_localStorage(state) {
        if (state !== undefined && this._localStorage !== undefined) {
            this._localStorage = state
        }
        return this._localStorage !== undefined
    }


    async get() {
        return await axios.get(`/api/auth/user/${user.uid}/`+ this.constructor.mainPaths, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                console.log(`get res: user/${this.constructor.mainPaths} ->`, res);
                await this.parse(res.data);
                if (this.canSet_localStorage(false)) {
                    this.localStorageSave();
                }
                return this
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

    async add(resource) {
        const key = u.newId();
        return await this.update({ [key]: resource });
    }

    async set(newResource = this) {
        if (newResource === null || newResource === undefined) {
            log.error(`${this.constructor.mainPaths} -> La newResource è null || undefined. Se vuoi puoi fare delete ma non set`);
            return false;
        }
        try {
            await this.parse(res.data);
        } catch (error) {
            log.error(String(error));
            return false;
        }
        return await this.save();
    }
    async save() {
        if (this.canSet_localStorage()) { this.localStorageSave(); }
        return await axios.post(`/api/auth/user/${user.uid}/` + this.constructor.mainPaths, this, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                this.canSet_localStorage(false);
                console.log(`save res: user/${this.constructor.mainPaths} ->`, res);

                return this
            })
            .catch((error) => {
                log.error(error);
                return false;
            });
    }

    async update(newResource) {
        if (newResource === null || newResource === undefined) {
            log.error(`${this.constructor.mainPaths} -> La newResource è null || undefined. Se vuoi puoi fare delete ma non update`);
            return false;
        }
        for (const key in newResource) { this[key] = newResource[key]; }

        if (this.canSet_localStorage()) { this.localStorageSave(); }
        return await axios.put(`/api/auth/user/${user.uid}/` + this.constructor.mainPaths, newResource, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                this.canSet_localStorage(false);
                console.log(`update res: user/${this.constructor.mainPaths} ->`, res);

                return this
            })
            .catch((error) => {
                log.error(error);
                return false;
            });
    }

    async delete(propPath) {
        let fullPath = `/api/auth/user/${user.uid}/${this.constructor.mainPaths}`;
        if (propPath) {
            if (propPath in this) {
                fullPath += `/${propPath}`;
                delete this[propPath];
                this.localStorageSave();
            } else {
                log.error(`${this.constructor.mainPaths} -> Il propPath non è presente tra le key.`);
                fullPath = false;
            }
        } else {
            for (const key in this) {
                if (typeof this[key] !== 'function') {
                    this[key] = null;
                }
            }
            this._deleted = true;
            this.localStorageDelete();
        }

        if (fullPath) {
            return await axios.delete(fullPath, { headers: { authorization: user.accessToken } })
                .then(async (res) => {
                    if (res.data.deleted) {
                        this.canSet_localStorage(false);
                        return res.data.deleted;
                    } else {
                        return false;
                    }
                })
                .catch((error) => {
                    console.error(error);
                    return false;
                });
        } else {
            return false;
        }
    }

}