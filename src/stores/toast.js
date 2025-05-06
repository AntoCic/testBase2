import { reactive } from 'vue';
import { nanoid } from 'nanoid';

// $toast
export const $toast = reactive({
    queue: [],

    start(toast) {
        toast.start(setTimeout(() => $toast.removeToastById(toast.id), toast.duration));
    },

    startAll() {
        for (const toast of this.queue) { this.start(toast) }
    },

    stop(toast) {
        if (toast.timer) {
            clearTimeout(toast.timer);
            toast.timer = null;

            const elapsed = Date.now() - toast.createdAt;
            const remaining = toast.duration - elapsed;
            toast.duration = Math.max(remaining, 0);
        }
    },

    stopAll() {
        for (const toast of this.queue) { toast.stop(); }
    },

    removeToastByIndex(index) {
        this.stop(this.queue[index]);
        this.queue.splice(index, 1);
    },

    removeToastById(id) {
        for (const index in this.queue) {
            if (this.queue[index].id === id) {
                this.removeToastByIndex(index);
                break;
            }
        }
    },

    _addToast(type, content, duration) {
        const toast = new Toast({
            type,
            title: typeof content === 'object' ? content.title : content,
            message: typeof content === 'object' ? content.message : undefined,
            logo: typeof content === 'object' ? content.logo : undefined,
            duration
        });
        this.queue.push(toast);
        this.start(toast);
    },

    info(content, duration) {
        this._addToast('info', content, duration);
    },
    error(content, duration) {
        this._addToast('error', content, duration);
    },
    success(content, duration) {
        this._addToast('success', content, duration);
    },
    warning(content, duration) {
        this._addToast('warning', content, duration);
    },
    primary(content, duration) {
        this._addToast('primary', content, duration);
    },
    secondary(content, duration) {
        this._addToast('secondary', content, duration);
    },
});

class Toast {
    constructor({ type = 'info', title = 'Errore', message, logo, duration = 3000 }) {
        this.type = type;
        this.id = nanoid();
        this.title = title === '' ? type : title;
        this.message = message;
        this.duration = duration;
        this.timer = null;
        this.createdAt = null;

        this.logo = logo;
        if (!this.logo) {
            switch (type) {
                case 'info':
                    this.logo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentcolor"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>`;
                    break;
                case 'error':
                    this.logo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentcolor"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>`;
                    break;
                case 'success':
                    this.logo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentcolor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z" /></svg>`;
                    break;
                case 'warning':
                    this.logo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentcolor"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>`;
                    break;
                case 'primary':
                    this.logo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentcolor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-80q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z"/></svg>`;
                    break;
                default:
                    this.logo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentcolor"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>`;
                    break;
            }

        }
    }

    start(timer) {
        this.createdAt = Date.now();
        this.timer = timer;
    }

    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;

            const elapsed = Date.now() - this.createdAt;
            const remaining = this.duration - elapsed;
            this.duration = Math.max(remaining, 0);
        }
    }
}

// 🔹 info
// 📘 ℹ️ 🧠

// ✅ success
// 🎉 ✅ 🥳

// ⚠️ warning
// ⚠️ 🚧 🟠

// ❌ error
// ❌ 🛑 💥

// 🔵 primary
// 🔷 💡 📌

// ⚪ secondary
// 🔘 💬 📎