import { reactive } from 'vue';
import { $loading } from './loading.js'
import axios from "axios";

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

    async start() {
        $loading.on()
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
        // todo tost
        return errorMsg
    }

});