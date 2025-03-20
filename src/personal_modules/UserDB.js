import axios from "axios";
import { user } from "../stores/user";
import log from "./log";

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

    // TODO cambiare _state in _localStorage che puo essere true false o undefined se non si vuole salvare nel localStorage
    // TODO capire che fare se si fa una delete di this e che succede se si è in locale e non viene comunicata la delete

    async init() {
        return (this._state && this._state === 'server') ? this : await this.get()
    }

    localStorageGet() {
        const localData = localStorage.getItem(this.constructor.mainPaths);
        if (localData) { return { ...(JSON.parse(localData)), _state: 'local' }; }
        return undefined;
    }
    localStorageInit() {
        const localData = this.localStorageGet();
        if (localData) { return this.parse(localData); }
        return undefined;
    }
    localStorageSave(objectToSave = this) {
        return localStorage.setItem(this.constructor.mainPaths, JSON.stringify({ ...objectToSave, _state: 'local' }));
    }

    async get() {
        return await axios.get('/api/user/' + this.constructor.mainPaths, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                res.data._state = 'server'
                console.log('Res from ' + '/api/user/' + this.constructor.mainPaths, res.data);
                return await this.parse(res.data);
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

    // async add(resource, id = false) {
    //     return await axios.post('/api/user/' + this.constructor.mainPaths, { data: resource, id }, { headers: { authorization: user.accessToken } })
    //         .then(async (res) => {
    //             return await this.parse(res.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             return false;
    //         });
    // }

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
        return await axios.post('/api/user/' + this.constructor.mainPaths, this, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                log(res);
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
        for (const key in this) {
            if (newResource?.[key] === undefined) continue
            this[key] = newResource[key];
        }
        return await axios.put('/api/user/' + this.constructor.mainPaths, newResource, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                log(res);
                return this
            })
            .catch((error) => {
                log.error(error);
                return false;
            });
    }

    async delete(propPath) {
        let fullPath = `/api/user/${this.constructor.mainPaths}`;
        if (propPath) {
            if (propPath in this) {
                fullPath += `/${propPath}`;
                this[propPath] = null;
            } else {
                log.error(`${this.constructor.mainPaths} -> Il propPath non è presente tra le key.`);
            }
        } else {
            for (const key in this) {
                this[key] = null;
                // Object.keys(this).forEach(key => delete this[key]);
            }
        }
        return await axios.delete(fullPath, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                if (res.data.deleted) {
                    return res.data.deleted;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

}