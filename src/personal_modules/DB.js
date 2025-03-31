import axios from "axios";
import log from "./log";
import { dbSync, sanitazeMainPath } from "../stores/dbSync";
import { user } from "../stores/user";

export default class DB {
    parse(res) {
        if (res) Object.assign(this, res);
        return this;
    }

    fullPath() {
        const apiPrefix = `${this.constructor.apiPrefix || '/api'}/${this.constructor.addUserId ? user.uid : ''}`;
        return `${apiPrefix}/${this.constructor.mainPath}`;
    }
    headers() {
        return this.constructor.addAuthorization ? { authorization: user.accessToken } : {};
    }

    async get() {
        return axios.get(this.fullPath(), {
            headers: this.headers()
        }).then(res => {
            return this.parse(res.data);
        }).catch(error => { log.error(error); return error; });
    }

    async save() {
        return axios.post(this.fullPath(), this, {
            headers: this.headers()
        }).then(() => {
            this.tabUpdated();
            return this;
        }).catch(error => { log.error(error); return error; });
    }
    async saveAndSyncLocal() {
        this.saveLocal();
        return this.save();
    }

    async update(newData) {
        Object.assign(this, newData);
        return axios.put(this.fullPath(), newData, {
            headers: this.headers()
        }).then(() => {
            this.tabUpdated();
            return this;
        }).catch(error => { log.error(error); return error; });
    }
    async updateAndSyncLocal() {
        this.updateLocal();
        return this.update();
    }

    async delete(key) {
        delete this[key];
        return axios.put(this.fullPath(), { [key]: null }, {
            headers: this.headers()
        }).then(res => {
            this.tabUpdated();
            return this;
        }).catch(error => { log.error(error); throw error; });
    }
    async deleteAndSyncLocal() {
        this.deleteLocal();
        return this.delete();
    }

    localPath() {
        const localPrefix = this.constructor.localPrefix || '_';
        return `${localPrefix}/${sanitazeMainPath(this.constructor.mainPath)}`;
    }
    saveLocal() {
        localStorage.setItem(this.localPath(), JSON.stringify(this));
    }
    updateLocal() {
        const key = this.localPath();
        const existing = localStorage.getItem(key);
        const parsed = existing ? JSON.parse(existing) : {};
        const updated = { ...parsed, ...this };
        localStorage.setItem(key, JSON.stringify(updated));
    }
    getLocal() {
        const data = localStorage.getItem(this.localPath());
        if (data) { return this.parse(JSON.parse(data)) }
        return this;
    }

    deleteLocal() { localStorage.removeItem(this.localPath()); }

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
