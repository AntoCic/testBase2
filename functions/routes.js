// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

// export const routes = {
//   GET: {
//     public: {
//       "": async (event) => await firebase.get(event),
//       "test": `[GET][NOT_AUTH]/: Chiamata test senza authorization`,
//       "importTest": (event) => {
//         return `${APP_NAME} :: ${onDevMod} :: ${JSON.stringify(allowedOrigins)} :: errorsList.length=${Object.keys(errorsList).length}`
//       },
//     },
//     auth: {
//       "": async (event) => await firebase.get(event),
//       "test": (event) => `[GET][AUTH]/: Chiamata test da ${event.user?.displayName}. QueryParams [test:${event.queryParams?.test}]`,
//     },
//   },

//   POST: {
//     public: {
//       "": async (event) => await firebase.post(event),
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//       slackMsg: handlerSlackMsg,
//     },
//     auth: {
//       "": async (event) => await firebase.post(event),
//       slackMsg: handlerSlackMsg,
//     },
//   },

//   PUT: {
//     public: {
//       "": async (event) => await firebase.put(event),
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//     },
//     auth: {
//       "": async (event) => await firebase.put(event),
//     },
//   },

//   PATCH: {
//     public: {
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//     },
//     auth: {},
//   },

//   DELETE: {
//     public: {
//       "": async (event) => await firebase.delete(event),
//       "test": (event) => `[GET][AUTH]/: pathParams ${JSON.stringify(event.pathParams ?? { pathParams: 'vuoto' })}. QueryParams/${JSON.stringify(event.queryParams ?? { queryParams: 'vuoto' })}. bodyParams/${JSON.stringify(event.bodyParams ?? { bodyParams: 'vuoto' })}`,
//     },
//     auth: {
//       "": async (event) => await firebase.delete(event),
//     },
//   },
// };