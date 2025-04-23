// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

// ATTENZIONE Segui il tutorial nel README.md.
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
import admin from 'firebase-admin';
import { APP_NAME, onDevMod, allowedOrigins } from "./config";
import { log, handlerSlackMsg } from './logger';
import { errorsList } from './errorsList';

const routes = {
  public: {
    GET: {
      "": async (event) => await firebase.get(event),
      "test": `[GET][NOT_AUTH]/: Chiamata test senza authorization`,
    },
    POST: {
      "": async (event) => await firebase.post(event),
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
      slackMsg: handlerSlackMsg,
    },
    PUT: {
      "": async (event) => await firebase.put(event),
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
    },
    PATCH: {
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
    },
    DELETE: {
      "": async (event) => await firebase.delete(event),
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
    },
  },

  auth: {
    GET: {
      "": async (event) => await firebase.get(event),
      "test": (event) => `[GET][AUTH]/: Chiamata test da ${event.user?.displayName}. QueryParams [test:${event.queryParams?.test}]`,
    },
    POST: {
      "": async (event) => await firebase.post(event),
      slackMsg: handlerSlackMsg,
    },
    PUT: {
      "": async (event) => await firebase.put(event),
    },
    PATCH: {},
    DELETE: {
      "": async (event) => await firebase.delete(event),
    },
  }
}




// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
//  ____  _____ _____ _   _   _ _   _____                      |
// |  _ \| ____|  ___/ \ | | | | | |_   _|                     |
// | | | |  _| | |_ / _ \| | | | |   | |                       |
// | |_| | |___|  _/ ___ \ |_| | |___| |                       |
// |____/|_____|_|/_/   \_\___/|_____|_|_____ ____             |
// | | | |_   _|_ _| |   |_ _|_   _|_ _| ____/ ___|            |
// | | | | | |  | || |    | |  | |  | ||  _| \___ \            |
// | |_| | | |  | || |___ | |  | |  | || |___ ___) |           |
//  \___/  |_| |___|_____|___| |_| |___|_____|____/            |
//                                                             |
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%



// ===============================
class FIREBASE {
  constructor() {
    // Fai attenzione, alcune di queste sono obbligatorie.
    // *  FIREBASE_TYPE,
    // *  FIREBASE_PROJECT_ID,
    // *  FIREBASE_PRIVATE_KEY_ID,
    // *  FIREBASE_PRIVATE_KEY,
    // *  FIREBASE_CLIENT_EMAIL,
    // *  FIREBASE_CLIENT_ID,
    // *  FIREBASE_AUTH_URI,
    // *  FIREBASE_TOKEN_URI,
    // *  FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    // *  FIREBASE_CLIENT_X509_CERT_URL,
    // *  FIREBASE_UNIVERSE_DOMAIN,
    // *  FIREBASE_DATABASEURL
    const required = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : null,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,

      idIndex: Math.floor(Math.random() * 100),
    };

    const optional = {
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? undefined,
      // storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    };

    Object.assign(this, { ...required, ...optional });

    for (const key in required) {
      if (this[key] == null) {
        const error = `Il campo ${key} è obbligatorio e non può essere nullo o indefinito.`;
        log.error(error)
        throw new Error();
      }
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        type: this.type,
        project_id: this.project_id,
        private_key_id: this.private_key_id,
        private_key: this.private_key,
        client_email: this.client_email,
        client_id: this.client_id,
        auth_uri: this.auth_uri,
        token_uri: this.token_uri,
        auth_provider_x509_cert_url: this.auth_provider_x509_cert_url,
        client_x509_cert_url: this.client_x509_cert_url,
        universe_domain: this.universe_domain,
      }),
      databaseURL: this.databaseURL,
      storageBucket: this.storageBucket ?? undefined
    });

    this.database = admin.database();
    this.bucket = this.storageBucket ? admin.storage().bucket() : undefined;
  }

  // Method che risponde con un nuovo unique id ogni volta che viene chiamata
  // newId() {
  //   let newId = this.idIndex.toString(36)
  //   this.idIndex++;
  //   newId += Math.random().toString(36).substring(2, 7) // stringa casuale
  //   newId += "-" + Date.now().toString(36) // converte in base 36
  //   return newId;
  // }

  async get(event) {
    try {
      const fullPath = this.getFullPath(event)
      const snapshot = await firebase.database.ref(fullPath).once('value');
      const data = snapshot.val();
      if (data === null) {
        throw new Error(errorsList.notFound.key);
      }
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async post(event) {
    try {
      const fullPath = this.getFullPath(event);
      await firebase.database.ref(fullPath).set(event.bodyParams);
      return;
    } catch (error) {
      log.error(String(error))
      throw new Error(String(error));
    }
  }

  async put(event) {
    try {
      const fullPath = this.getFullPath(event);
      await firebase.database.ref(fullPath).update(event.bodyParams);
      return;
    } catch (error) {
      log.error(String(error))
      throw new Error(String(error));
    }
  }

  async delete(event) {
    try {
      const fullPath = this.getFullPath(event);
      await firebase.database.ref(fullPath).remove();
      return { deleted: event.pathParams.at(-1) };
    } catch (error) {
      log.error(String(error))
      throw new Error(String(error));
    }

  }

  getFullPath(event) { return '/' + event.pathParams.join('/'); }

}
// ATTENZIONE inizializzare FIREBASE esattamente cosi.
let firebase = null
try { firebase = new FIREBASE(); } catch (error) { log.error(String(error)); }


// Controlla se ci sono chiavi dentro auth
if (routes.auth || typeof routes.auth === 'object') {
  const IsSetAnyAuthRoutes = !(Object.keys(routes.auth).length === 0 || Object.values(routes.auth).every(value => typeof value === 'object' && Object.keys(value).length === 0));
  if (IsSetAnyAuthRoutes && !firebase) {
    log.error('non hai settato tutte le chiavi in env');
  }
}

// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%

// manca anche firebase e admin da passare
class EventHandler {
  constructor({ rawUrl, path, httpMethod, body, headers, multiValueQueryStringParameters }, routes) {
    this.rawUrl = rawUrl;
    this.httpMethod = httpMethod;
    this.pathParams = this.parsePathParams(path);
    this.queryParams = this.parseQueryParams(multiValueQueryStringParameters);
    try {
      this.bodyParams = body !== undefined ? JSON.parse(body) : undefined;
    } catch (error) {
      this.bodyParams = { msg: 'EventHandler error on JSON.parse(body): typeof body = ' + typeof body }
    }
    this.bodyParams = body !== undefined ? JSON.parse(body) : undefined;
    this.authorization = headers?.authorization;
    if (headers?.authorization) delete headers.authorization
    // this.headers = headers;

    try {
      const urlObj = new URL(rawUrl);
      const originWithoutPort = `${urlObj.protocol}//${urlObj.hostname}`;
      if (allowedOrigins.includes(originWithoutPort)) {
        this.isOriginAllowed = true;
      } else {
        log.error('Request from not allowed origin ' + rawUrl)
        this.isOriginAllowed = false;
      }

    } catch (error) {
      log.error("Errore nel parsing dell'URL:", error);
      this.isOriginAllowed = false;
    }

    this.routes = routes;
    this.pathIndex = 0;
    this.statusCode = 200;
    this.headersResponse = { "Content-Type": "application/json" };
    this.bodyResponse = {};

    this.user = null;
    log.interno.magenta(`${this.httpMethod} :: ${this.pathParams ? this.pathParams.join('/') : '_'} :: ${!!this.authorization ? 'AUTH KEY' : 'NO AUTH KEY'}`);
  }

  parseQueryParams(multiValueQueryStringParameters) {
    const queryParams = multiValueQueryStringParameters
    for (const key in multiValueQueryStringParameters) {
      if (multiValueQueryStringParameters[key].length <= 1) {
        queryParams[key] = multiValueQueryStringParameters[key]?.[0]
      }
    }
    return queryParams
  }

  parsePathParams(path) {
    const pathParams = path.split("/");
    for (let index = 0; index < 2; index++) {
      pathParams.shift();
    }
    if (pathParams.length === 0) pathParams.push('');
    return pathParams
  }

  async isAuth() {
    if (!firebase) {
      log.error("Devi settare tutte le chiavi di firebase nell'env");
      return false;
    }
    if (!this.authorization) {
      log.error("401, |I| Unauthorized");
      this.user = undefined
      return false;
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(this.authorization);
      this.user = await admin.auth().getUser(decodedToken.uid);
      return true;
    } catch (error) {
      log.error("401, |I| Unauthorized | authorization:" + this.authorization + '| error:' + JSON.stringify(error));
      this.user = undefined
      return false;
    }
  }

  async response() {
    const firstPathParam = this.pathParams[0];
    if (firstPathParam === 'public') {
      this.pathIndex++
      return this.getroutesFunction(this.routes.public?.[this.httpMethod]) ?? this.errorResponse(404, 'Route not found');
    }
    if (firstPathParam === 'auth') {
      if (await this.isAuth()) {
        if (this.pathParams[1] === 'user') {
          const requestedUserId = this.pathParams?.[2];
          if (requestedUserId !== this.user.uid) {
            return this.errorResponse(403, 'Forbidden: userId does not match authenticated user');
          }
        }
        this.pathIndex++
        return this.getroutesFunction(this.routes.auth?.[this.httpMethod]) ?? this.errorResponse(404, 'Route not found');
      } else {
        return this.errorResponse(401, 'Unauthorized');
      }
    }
    return this.errorResponse(403, 'Invalid route: must start with "public" or "auth"');
  }

  errorResponse(statusCode = 400, error = '400 Bad Request') {
    if (typeof error === 'string') error = '|I|Error: ' + error
    return this.setResponse({ error }, statusCode);
  }

  setResponse(body, statusCode = this.statusCode, headers = this.headersResponse) {
    this.bodyResponse = body;
    this.statusCode = statusCode;
    this.headersResponse = headers;
    return this.getResponse();
  }
  getResponse() {
    return {
      statusCode: this.statusCode,
      headers: this.headersResponse,
      body: JSON.stringify(this.bodyResponse),
    }
  }

  handlerError(error) {
    const key = (error.message || '').replace(/^Error:\s*/, '').trim();
    const code = errorsList[key].code ?? errorsList.unknown.code;
    const msg = errorsList[key].msg ?? errorsList.unknown.msg;
    return this.errorResponse(code, msg);
  }

  async getroutesFunction(routes, oldDefaultFunction = undefined) {
    if (routes !== undefined) {
      const routToCheck = routes[this.pathParams?.[this.pathIndex]];

      if (routToCheck) {
        switch (typeof routToCheck) {
          case 'function':
            return await routToCheck(this)
              .then((response) => {
                return this.setResponse(response);
              })
              .catch((error) => this.handlerError(error));

          case 'object':
            const currentFunction = routToCheck?.['']
            this.pathIndex++
            return await this.getroutesFunction(routToCheck, currentFunction);

          case 'boolean':
          case 'string':
          case 'number':
            return this.setResponse(routToCheck);

          default:
            log.error('Rout dichiarata male, non è una function o un object');
            return this.errorResponse(500, 'Rout dichiarata male, non è una function o un object');
        }
      } else {
        if (this.pathIndex === 1) {
          oldDefaultFunction = routes?.['']
        }
        if (oldDefaultFunction !== undefined || routes[this.pathParams?.[this.pathIndex - 1]]) {
          switch (typeof oldDefaultFunction) {
            case 'function':
              return await oldDefaultFunction(this)
                .then((response) => {
                  return this.setResponse(response);
                })
                .catch((error) => this.handlerError(error));
            case 'boolean':
            case 'string':
            case 'number':
              return this.setResponse(oldDefaultFunction);
            default:
              log.error('Rout dichiarata male, non è una function o un object');
              return this.errorResponse(500, 'Rout dichiarata male, non è una function o un object');
          }
        }
        return this.errorResponse(404, 'Route not found');
      }
    } else {
      return this.errorResponse(404, 'Route not found');
    }
  }
}

exports.handler = async function (event, context) {
  const call = new EventHandler(event, routes);
  return call.response();
};