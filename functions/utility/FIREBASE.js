// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

import admin from 'firebase-admin';
import { log } from './logger';

export class FIREBASE {
  constructor() {
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

  async get(event) {
    try {
      const fullPath = this.getFullPath(event)
      const snapshot = await this.database.ref(fullPath).once('value');
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
      await this.database.ref(fullPath).set(event.bodyParams);
      return;
    } catch (error) {
      log.error(String(error))
      throw new Error(String(error));
    }
  }

  async put(event) {
    try {
      const fullPath = this.getFullPath(event);
      await this.database.ref(fullPath).update(event.bodyParams);
      return;
    } catch (error) {
      log.error(String(error))
      throw new Error(String(error));
    }
  }

  async delete(event) {
    try {
      const fullPath = this.getFullPath(event);
      const key = event?.queryParams?.key;
      if (!key) { throw new Error("Try to delete, params: { key } non presente"); }
      await this.database.ref(fullPath + '/' + key).remove();
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


// // Controlla se ci sono chiavi dentro auth
// if (routes.auth || typeof routes.auth === 'object') {
//   const IsSetAnyAuthRoutes = !(Object.keys(routes.auth).length === 0 || Object.values(routes.auth).every(value => typeof value === 'object' && Object.keys(value).length === 0));
//   if (IsSetAnyAuthRoutes && !firebase) {
//     log.error('non hai settato tutte le chiavi in env');
//   }
// }

export { firebase }
