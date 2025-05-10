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
import { FIREBASE } from './FIREBASE';

// const routes = {
//   public: {
//     GET: {
//       "": async (event) => await firebase.get(event),
//       "test": `[GET][NOT_AUTH]/: Chiamata test senza authorization`,
//       "importTest": (event) => {
//         return `${APP_NAME} :: ${onDevMod} :: ${JSON.stringify(allowedOrigins)} :: errorsList.length=${Object.keys(errorsList).length}`
//       },
//     },
//     POST: {
//       "": async (event) => await firebase.post(event),
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//       slackMsg: handlerSlackMsg,
//     },
//     PUT: {
//       "": async (event) => await firebase.put(event),
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//     },
//     PATCH: {
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//     },
//     DELETE: {
//       "": async (event) => await firebase.delete(event),
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//     },
//   },

//   auth: {
//     GET: {
//       "": async (event) => await firebase.get(event),
//       "test": (event) => `[GET][AUTH]/: Chiamata test da ${event.user?.displayName}. QueryParams [test:${event.queryParams?.test}]`,
//     },
//     POST: {
//       "": async (event) => await firebase.post(event),
//       slackMsg: handlerSlackMsg,
//     },
//     PUT: {
//       "": async (event) => await firebase.put(event),
//     },
//     PATCH: {},
//     DELETE: {
//       "": async (event) => await firebase.delete(event),
//     },
//   }
// }

const routes = {
  GET: {
    public: {
      "": async (event) => await firebase.get(event),
      "test": `[GET][NOT_AUTH]/: Chiamata test senza authorization`,
      "importTest": (event) => {
        return `${APP_NAME} :: ${onDevMod} :: ${JSON.stringify(allowedOrigins)} :: errorsList.length=${Object.keys(errorsList).length}`
      },
    },
    auth: {
      "": async (event) => await firebase.get(event),
      "test": (event) => `[GET][AUTH]/: Chiamata test da ${event.user?.displayName}. QueryParams [test:${event.queryParams?.test}]`,
    },
  },

  POST: {
    public: {
      "": async (event) => await firebase.post(event),
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
      slackMsg: handlerSlackMsg,
    },
    auth: {
      "": async (event) => await firebase.post(event),
      slackMsg: handlerSlackMsg,
    },
  },

  PUT: {
    public: {
      "": async (event) => await firebase.put(event),
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
    },
    auth: {
      "": async (event) => await firebase.put(event),
    },
  },

  PATCH: {
    public: {
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
    },
    auth: {},
  },

  DELETE: {
    public: {
      "": async (event) => await firebase.delete(event),
      "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
    },
    auth: {
      "": async (event) => await firebase.delete(event),
    },
  },
};





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
  constructor({ rawUrl, path, httpMethod, body, headers, multiValueQueryStringParameters }, functionToResolve, user) {
    this.rawUrl = rawUrl;
    this.httpMethod = httpMethod;
    this.pathParams = this.parsePathParams(path);
    this.queryParams = this.parseQueryParams(multiValueQueryStringParameters);
    try {
      this.bodyParams = body !== undefined ? JSON.parse(body) : undefined;
    } catch (error) {
      this.bodyParams = body;
      if (body !== null && body !== '') {
        log.error(`Errore nel parsing del body: ${String(body)} :: ${error}`);
      }
    }
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

    this.functionToResolve = functionToResolve;
    this.statusCode = 200;
    this.headersResponse = { "Content-Type": "application/json" };
    this.bodyResponse = {};

    this.user = user;
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

  async response() {
    if (this.pathParams[0] === 'user' || this.pathParams[0] === 'public') {
      return this.errorResponse(405, 'Rout Not Allowed. Miss /user o /public ');
    }

    try {
      const response = await this.functionToResolve(this);
      return this.setResponse(response);
    } catch (error) {
      return this.handlerError(error)
    }

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

}

exports.handler = async function (event, context) {
  const pathParams = event.path.split('/').slice(2);
  if (pathParams.length === 0) pathParams.push('');

  try {
    let user = undefined;
    if (pathParams?.[0] === 'auth') {
      if (event.headers?.authorization) {
        const authorization = event.headers.authorization
        try {
          const decodedToken = await admin.auth().verifyIdToken(authorization);
          user = await admin.auth().getUser(decodedToken.uid);
        } catch (error) {
          log.error("401, |I| Unauthorized: authorization not valid :" + authorization + '| error:' + JSON.stringify(error));
          this.user = undefined
          return {
            statusCode: 401,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify('|I| Unauthorized: authorization not valid'),
          }
        }

      } else {
        return {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify('|I| Unauthorized. Miss headers.authorization'),
        }
      }
    }
    const httpMethod = event?.httpMethod;
    if (!httpMethod) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("Missing or invalid HTTP method"),
      }
    };
    
    const functionToResolve = getRoutesFunction(routes[httpMethod], pathParams);

    if (typeof functionToResolve === 'string') {
      return {
        statusCode: functionToResolve === 'Route not found' ? 404 : 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(functionToResolve),
      }
    }

    const call = new EventHandler(event, functionToResolve, user);
    return call.response();

  } catch (error) {
    log.error(String(error));
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(error),
    }
  }

};

function getRoutesFunction(_routes, pathParams, oldDefaultFunction = undefined, pathIndex = 0) {
  if (_routes !== undefined) {
    const routToCheck = _routes[pathParams?.[pathIndex]];

    if (routToCheck) {
      switch (typeof routToCheck) {
        case 'function':
          return routToCheck

        case 'object':
          const currentFunction = routToCheck?.['']
          return getRoutesFunction(routToCheck, pathParams, currentFunction, pathIndex + 1);

        case 'boolean':
        case 'string':
        case 'number':
          return () => routToCheck;

        default:
          return 'Rout dichiarata male.';
      }
    } else {
      if (pathIndex === 1) {
        oldDefaultFunction = _routes?.['']
      }
      if (oldDefaultFunction !== undefined || _routes[pathParams?.[pathIndex - 1]]) {
        switch (typeof oldDefaultFunction) {
          case 'function':
            return oldDefaultFunction;

          case 'boolean':
          case 'string':
          case 'number':
            return () => oldDefaultFunction;
          default:
            return 'Rout dichiarata male.';
        }
      }
      return 'Route not found';
    }
  } else {
    return 'Route not found';
  }
}
