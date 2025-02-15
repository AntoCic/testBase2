<template>
    <div class="border p-2 rounded position-relative">
        <div class="position-absolute top-0 end-0 pt-2 pe-4">
            <button type="button" class="btn btn-outline-dark border-0 p-1" @click="pasteFromClipboard">
                <span class="material-symbols-outlined"> content_paste </span>
            </button>
            <button type="button" class="btn btn-outline-dark border-0 p-1" @click="copyToClipboard">
                <span class="material-symbols-outlined"> copy_all </span>
            </button>
        </div>

        <textarea v-model="textEnv" @input="parseFirebaseAdminKey"
            placeholder="Inserisci la chiave da Firebase: Impostazioni > Account Servizio > Genera chiave privata. Poi copiare anche il databaseURL scritto sopra e inserirlo nell\'oggetto. Poi copiare il risultato della chiamata in env su Netlify."></textarea>
        <pre>{{ env }}</pre>
    </div>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div v-if="toastMessage" :class="`toast base-toast show align-items-center text-bg-${type} border-0`" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    {{ toastMessage }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="toastMessage = ''"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            textEnv: '',
            env: '',
            toastMessage: '',
            type: '',
            toastTimeout: null,
        };
    },
    methods: {
        parseFirebaseAdminKey() {
            if (!this.textEnv.trim()) {
                this.env = '';
                return;
            }

            try {
                const objectKey = JSON.parse(this.textEnv);
                const keyToCheck = [
                    'type', 'project_id', 'private_key_id', 'private_key',
                    'client_email', 'client_id', 'auth_uri', 'token_uri',
                    'auth_provider_x509_cert_url', 'client_x509_cert_url',
                    'universe_domain', 'databaseURL'
                ];

                let parsedEnv = '';

                for (const key of keyToCheck) {
                    if (objectKey?.[key]) {
                        parsedEnv += `\nFIREBASE_${key.toUpperCase()}=${objectKey[key].replace(/\n/g, '\\n')}`;
                    } else {
                        this.env = `Errore: Manca la chiave "${key}" nel JSON.`;
                        return;
                    }
                }

                this.env = parsedEnv.trim();
            } catch (error) {
                this.env = 'Errore nel parsing del JSON. Assicurati che il formato sia corretto.';
            }
        },

        async copyToClipboard() {
            if (!this.env) {
                this.showToast('Nessun testo da copiare.', 'danger');
                return;
            }
            try {
                await navigator.clipboard.writeText(this.env);
                this.showToast('Testo copiato negli appunti!', 'success');
            } catch (error) {
                this.showToast('Errore durante la copia.', 'danger');
            }
        },

        async pasteFromClipboard() {
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    this.textEnv = text;
                    this.parseFirebaseAdminKey();
                    this.showToast('Testo incollato dagli appunti!', 'success');
                } else {
                    this.showToast('Nessun testo trovato negli appunti.', 'warning');
                }
            } catch (error) {
                this.showToast('Errore durante l’incollamento.', 'danger');
            }
        },

        showToast(message, type = 'info', timeSecond = 4) {
            this.toastMessage = message;
            this.type = type;
            if (this.toastTimeout) { clearTimeout(this.toastTimeout); };
            this.toastTimeout = setTimeout(() => { this.toastMessage = '';}, (timeSecond * 1000));
        }
    }
}
</script>

<style scoped>
textarea {
    width: 100%;
    height: 150px;
    padding: 20px;
    padding-top: 22px;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    font-family: monospace;
    font-size: 14px;
}

pre {
    background: #f4f4f4;
    padding: 10px;
    border-radius: 4px;
    color: #000;
    margin-bottom: 0;
    border-radius: 0.5em;
}

@keyframes slideInFromTop {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.toast.base-toast{
    animation: slideInFromTop 0.3s ease-in-out;
}


</style>