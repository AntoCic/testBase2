import axios from "axios";
import log from "./log";
import { dbSync, sanitazeMainPath } from "../stores/dbSync";
import { user } from "../stores/user";
import { nanoid } from 'nanoid';

export default class DB {

    parse(res) {
        if (res && typeof res === 'object' && !Array.isArray(res)) {
            const parsed = {};
            for (const [key, val] of Object.entries(res)) {
                if (key.startsWith('date') && typeof val === 'string') {
                    parsed[key] = new Date(val);
                } else {
                    parsed[key] = val;
                }
            }
            return parsed;
        }
        return res;
    }
    assign(res) {
        const parsed = this.parse(res)
        if (parsed) Object.assign(this, parsed);
        return this;
    }
    set(res) {
        const parsed = this.parse(res);
        if (parsed) {
            for (const key in this) {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    delete this[key];
                }
            }
            Object.assign(this, parsed);
        }
        return this;
    }

    fullPath() {
        const apiPrefix = `${this.constructor.apiPrefix || '/api'}${this.constructor.addUserId ? '/' + user.uid : ''}`;
        return `${apiPrefix}/${this.constructor.mainPath}`;
    }
    localPath() {
        const localPrefix = this.constructor.localPrefix || '_';
        return `${localPrefix}${sanitazeMainPath(this.constructor.mainPath)}`;
    }
    headers() {
        return this.constructor.addAuthorization ? { authorization: user.accessToken } : {};
    }

    // GET
    async get() {
        return axios.get(this.fullPath(), {
            headers: this.headers()
        }).then(res => {
            return this.set(res.data);
        }).catch(error => { log.error(error); return error; });
    }
    getLocal() {
        const data = localStorage.getItem(this.localPath());
        return data ? this.parse(JSON.parse(data)) : null;
    }
    assignLocal() {
        const data = this.getLocal();
        return data ? this.assign(data) : this;
    }
    async getAndSyncLocal() {
        const res = await this.get();
        if (res instanceof Error) { throw res; }
        this.saveLocal();
        return this;
    }

    // SAVE
    async save() {
        return axios.post(this.fullPath(), this, {
            headers: this.headers()
        }).then(() => {
            this.tabUpdated();
            return this;
        }).catch(error => { log.error(error); return error; });
    }
    saveLocal() {
        localStorage.setItem(this.localPath(), JSON.stringify(this));
    }
    async saveAndSyncLocal() {
        this.saveLocal();
        return this.save();
    }

    // UPDATE
    async update(newData) {
        Object.assign(this, newData);
        return axios.put(this.fullPath(), newData, {
            headers: this.headers()
        }).then(() => {
            this.tabUpdated();
            return this;
        }).catch(error => { log.error(error); return error; });
    }
    updateLocal(newData) {
        const data = this.getLocal() ?? {};
        const updated = { ...data, ...newData };
        Object.assign(this, updated);
        localStorage.setItem(this.localPath(), JSON.stringify(updated));
    }
    async updateAndSyncLocal(newData) {
        this.updateLocal(newData);
        return this.update(newData);
    }

    // ADD
    async add(newData, id = nanoid()) {
        Object.assign(this, { [id]: newData });
        const newInstance = await this.update({ [id]: newData })
        return { id, serverUpload: !(newInstance instanceof Error), newInstance }
    }
    addLocal(newData, id = nanoid()) {
        this.updateLocal({ [id]: newData });
        return id
    }
    async addAndSyncLocal(newData, id = nanoid()) {
        this.addLocal(newData, id);
        return this.add(newData, id);
    }

    // DELETE
    async delete(key) {
        delete this[key];
        console.log(this.fullPath());

        return axios.delete(this.fullPath(), { params: { key }, headers: this.headers() })
            .then(res => {
                this.tabUpdated();
                return this;
            }).catch(error => { log.error(error); throw error; });
    }
    deleteLocal(key) {
        const data = this.getLocal() ?? {};
        if (data?.[key] !== undefined) { delete data[key]; }
        localStorage.setItem(this.localPath(), JSON.stringify(data));
    }
    async deleteAndSyncLocal(key) {
        this.deleteLocal(key);
        return this.delete(key);
    }

    clearLocal() {
        localStorage.removeItem(this.localPath());
        return this;
    }

    // Notifica l'aggiornamento tramite dbSync (ad es. per sincronizzazione su altre schede)
    tabUpdated(content) {
        const localPrefix = this.constructor.localPrefix || '_';
        if (content !== undefined) {
            dbSync.update(localPrefix + this.constructor.mainPath, { updatedAt: new Date(), content });
        } else {
            dbSync.update(localPrefix + this.constructor.mainPath, { updatedAt: new Date() });
        }
    }
}
