// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|
const onDevMod = process.env.NETLIFY_DEV === "true" || process.env.NODE_ENV === "development";

function logColor(content, color = 'info') {
  const strColors = {
    white: "\x1b[37m", error: "\x1b[31m", warning: "\x1b[33m",
    info: "\x1b[34m", success: "\x1b[32m", magenta: "\x1b[35m", black: "\x1b[30m"
  };
  const strColor = strColors[color] || strColors.info;
  console.log(strColor, content, "\x1b[0m");
}
function hr(type = 'white', double = true, length = 10) {
  const line = (double ? '=' : '-').repeat(length);
  logColor(line, type);
}
export function logInterno(content, type) {
  hr(type); console.log(content); hr(type, false);
}
async function slackMsg(content, type) {
  const typeWebhookURL = {
    error: process.env.SLACK_WEBHOOK_ERROR,
    warning: process.env.SLACK_WEBHOOK_WARNING,
    info: process.env.SLACK_WEBHOOK_INFO,
  }
  let webhookURL = typeWebhookURL[type];

  if (!webhookURL) { log.noMsg.warning('IMPORTANTE: Non è stato settato il webhookURL per Slack'); }
  // if (onDevMod) { logInterno(content, type); return false; }
  if (!webhookURL) { return false; }

  const errorCase = "Slack webhookURL error nell'invio della notifica"
  const payload = { text: `${APP_NAME}: ${JSON.stringify(content)}` };
  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      log.noMsg.error(`${errorCase} -> ${response.status} - ${response.statusText}`);
      return false;
    }
    return true;
  } catch (error) {
    log.noMsg.error(`${errorCase} -> ${error}`);
    return false;
  }
}
export const log = Object.assign(
  async function (content) { return await slackMsg(content, 'info'); },
  {
    error: async (content) => await slackMsg(content, 'error'),
    warning: async (content) => await slackMsg(content, 'warning'),
    info: async (content) => await slackMsg(content, 'info'),
    noMsg: {
      error: (content) => logColor(content, 'error'),
      warning: (content) => logColor(content, 'warning'),
      info: (content) => logColor(content, 'info'),
    },
  }
);
