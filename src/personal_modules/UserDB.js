import axios from "axios";
import { user } from "../stores/user";

export default class UserDB {
    static build(item, required = {}, optional = {}) {
        for (const key in { ...required, ...optional, id: undefined }) {
            this[key] = item[key] ?? required[key] ?? optional[key];
        }
    }

    async parse(res) {
        if (res) {
            for (const key in res) { this[key] = res[key] }
            if (!this.id) { this.id = this.constructor.mainPaths }
            return this;
        }
        return res;
    }

    async init() { return this.id ? this : await this.get() }

    async get() {
        return await axios.get('/api/user/' + this.constructor.mainPaths, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                return await this.parse(res.data);
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

    async add(resource, id = false) {
        return await axios.post('/api/user/' + this.constructor.mainPaths, { data: resource, id }, { headers: { authorization: user.accessToken } })
            .then(async (res) => {
                return await this.parse(res.data);
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

    async update(newResource = {}) {
        const updateResource = {
            ...JSON.parse(JSON.stringify(this)),
            ...JSON.parse(JSON.stringify(newResource))
        };
        if (updateResource.files) {
            updateResource.files = Object.keys(updateResource.files).reduce((acc, key) => {
                acc[key] = updateResource.files[key].fileName;
                return acc;
            }, {});
        }

        if (newResource != null) {
            return await axios.put('/api/user/' + this.constructor.mainPaths, { data: updateResource, id: this.id }, { headers: { authorization: user.accessToken } })
                .then(async (res) => {
                    return await this.constructor.parse(res.data);
                })
                .catch((error) => {
                    console.error(error);
                    return false;
                });
        } else {
            console.error('La newResource è null.');
            return false;
        }
    }

    async delete(id = '', propPath = null) {
        if (id === '') {
            id = this.id
        }
        if (propPath !== null) {
            propPath = '/' + propPath
        } else {
            propPath = ''
        }
        return await axios.delete('/api/user/' + this.constructor.mainPaths + propPath, { data: { id }, headers: { authorization: user.accessToken } })
            .then(async (res) => {
                if (res.data.deleted) {
                    if (id === this.id) {
                        for (const filekey in this.files) {
                            await this.deleteFile(filekey)
                        }
                    }
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


    // async getFiles() {
    //     return await axios.post(`/api/user/g-files/${this.id}`, { fileNames: this.files }, {
    //         headers: {
    //             authorization: user.accessToken
    //         }
    //     }).then((res) => {
    //         if (res.data.urls) {
    //             this.files = res.data.urls
    //             return res.data.urls
    //         } else {
    //             console.error('Failed to get files:', res.data.message);
    //             return null
    //         }
    //     }).catch((error) => {
    //         console.error('Get files error:', error);
    //         return null
    //     })

    // }

    // async uploadFiles(selectedFiles) {
    //     if (!selectedFiles || selectedFiles.length === 0) {
    //         console.error('No file selected!');
    //         return null;
    //     }

    //     try {
    //         const resFiles = {}
    //         for (const file of selectedFiles) {
    //             // Converti il file in base64 utilizzando una Promise
    //             const base64Data = await new Promise((resolve, reject) => {
    //                 const reader = new FileReader();
    //                 reader.readAsDataURL(file);
    //                 reader.onload = () => resolve(reader.result.split(',')[1]);
    //                 reader.onerror = reject;
    //             });

    //             const fileName = file.name;

    //             // Effettua la richiesta di upload
    //             const res = await axios.post(`/api/user/a-file/${this.id}`, {
    //                 base64Data,
    //                 fileName
    //             }, {
    //                 headers: {
    //                     authorization: user.accessToken
    //                 }
    //             })

    //             if (res.data) {
    //                 const [key, fileData] = Object.entries(res.data)[0]
    //                 resFiles[key] = fileData
    //                 const files = { ...this.files, ...resFiles }

    //                 this.files = files
    //                 await this.update()
    //             } else {
    //                 console.error('Upload failed:', res);
    //                 return null;
    //             }
    //         }
    //         return resFiles
    //     } catch (error) {
    //         console.error('Upload error:', error);
    //         return null;
    //     }


    // }

    // async deleteFile(filekey) {
    //     const fileName = this.files[filekey].fileName
    //     axios.post(`/api/user/d-file/${this.id}`, { fileName }, {
    //         headers: {
    //             Authorization: user.accessToken,
    //         },
    //     }).then(async (res) => {
    //         if (res.data.deleted) {
    //             await this.delete(filekey, this.id + '/files')
    //             delete this.files[filekey]
    //         } else {
    //             console.error('Delete failed:', res.data);
    //         }
    //     }).catch((error) => {
    //         console.error('Delete error:', error);
    //     })
    // }
}