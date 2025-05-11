// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

import { log } from './logger';
import { allowedOrigins } from "../config";
import { errorsList } from './errorsList';

export class EventHandler {
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
    if (headers?.authorization) delete headers.authorization;
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
      log.error("Errore nel parsing allowed origin:", error);
      this.isOriginAllowed = false;
    }

    this.functionToResolve = functionToResolve;
    this.statusCode = 200;
    this.headersResponse = { "Content-Type": "application/json" };
    this.bodyResponse = {};

    this.user = user;
    // log.interno.magenta(`${this.httpMethod} :: ${this.pathParams ? this.pathParams.join('/') : '_'} :: ${!!this.authorization ? 'AUTH KEY' : 'NO AUTH KEY'}`);
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
    // log.info(`${this.pathParams[0]} -- ${this.pathParams.join('@')} `);

    if (!(this.pathParams[0] === 'auth' || this.pathParams[0] === 'public')) { return this.errorResponse(405, 'Rout Not Allowed. Miss /user o /public '); }

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