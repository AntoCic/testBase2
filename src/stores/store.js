import { reactive } from 'vue';
import { $loading } from './loading.js'
import { $toast } from './toast.js';
import axios from "axios";
import { nanoid } from 'nanoid';
import log from '../personal_modules/log.js';

// store
export const $s = reactive({

    appVersion: __APP_VERSION__,
    appName: __APP_NAME__,
    appShortName: __APP_SHORT_NAME__,
    appDescription: __APP_DESCRIPTION__,
    bkColor: __APP_BACKGROUND_COLOR__,
    logoPath: __APP_LOGO__,

    isLogged: null,
    accessToken: '',
    onLine: navigator.onLine,

    pingSyncMS: (3 * 1000), // tempo di ping in millisecondi se 0 non viene eseguito

    async start() {
        this.offlineActions.load();
        $loading.on();
        setTimeout(async () => {

            // await axios.get('/api')
            //     .then((res) => {
            //         console.log(res.data);
            //     })
            //     .catch((err) => {
            //         location.reload();
            //     });

            // await axios.post('/api/test', { msg: 'Hello World' })
            //     .then((res) => {
            //         console.log(res.data);
            //     })
            //     .catch((err) => {
            //         location.reload();
            //     });

            $loading.off()
        }, 500);

        // INSERISCI QUA CARICAMENTI DATI PUBLICI
        return
    },

    async onLogin() {
        // INSERISCI QUA CARICAMENTI DATI USER
        // await this.item.get()
        $loading.on("Altri 2s per vedere il loader");
        setTimeout(() => {
            $loading.off();
        }, 2000);
    },

    onLogout() {
        console.log('- LOGOUT -');
    },

    axiosError(error) {
        const errorMsg = error.response?.data?.error ?? `Errore: ${error.response?.status} - ${error.response?.statusText}`
        console.error(errorMsg)
        console.log(error);
        $toast.error(errorMsg)
        return errorMsg
    },


    offlineActions: {
        localStorageKey: 'offlineActions',
        queue: [],

        // todo method per processare le azioni offline
        async drain() {
            if (!this.queue.length) return;
            const actionToDelete = [];
            for (const action of this.queue) {
                switch (action.name) {
                    case 'test':
                        try {
                            // await this.handleTestAction(action); // todo se azione va a buon fine la elimina
                            actionToDelete.push(action.id);
                            if (action.msg && action.msg !== '') { $toast.info(action.msg); }
                        } catch (err) {
                            console.log(`Errore nel processare l'azione ${action.name}:`, err);
                        }
                        break;

                    default:
                        log.warn(`Drain action ${action.name} non gestito`);
                        break;
                }
            }
            this.queue = this.queue.filter(action => !actionToDelete.includes(action.id));
            this.save();
        },

        load() {
            const stored = localStorage.getItem(this.localStorageKey);
            this.queue = stored ? JSON.parse(stored) : [];
        },

        save() {
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.queue));
        },

        push(name, data, msg) {
            const action = new Action(name, data, msg);
            this.queue.push(action);
            this.save();
            return action;
        },

        deleteByIndex(index) {
            this.queue.splice(index, 1);
            this.save();
        },

        deleteById(id) {
            for (const index in this.queue) {
                if (this.queue[index].id === id) {
                    this.deleteByIndex(index);
                    break;
                }
            }
        },
    }

});
class Action {
    constructor(name, data, msg) {
        this.id = nanoid();
        this.name = name;
        this.msg = msg;
        this.data = data;
    }
}