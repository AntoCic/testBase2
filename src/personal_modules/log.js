// log
const onDevMod = import.meta.env.DEV || window.location.hostname === "localhost";

async function slackMsg(type, content) {
    if (onDevMod) {
        console.log(`🔹LOG[${type}]: `, content);
        return false;
    }
    if (navigator.onLine) {
        return await fetch('/api/public/slackMsg', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, content }),
        })
            .then((res) => res.json())
            .then((data) => !!data.sended)
            .catch((err) => { console.log(err); return false; });
    }

    return false;
}

const log = Object.assign(
    async function (content) { return await slackMsg('info', content); },
    {
        error: async (content) => await slackMsg('error', content),
        warning: async (content) => await slackMsg('warning', content),
        info: async (content) => await slackMsg('info', content),
    }
);
export default log;