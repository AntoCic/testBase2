// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

export const errorsList = {
  badRequest:         { code: 400, msg: "Bad request", key: "badRequest" },
  unauthorized:       { code: 401, msg: "Unauthorized", key: "unauthorized" },
  forbidden:          { code: 403, msg: "Forbidden", key: "forbidden" },
  notFound:           { code: 404, msg: "Not found", key: "notFound" },
  routeNotFound:      { code: 404, msg: "Route not found", key: "routeNotFound" },
  methodNotAllowed:   { code: 405, msg: "Method not allowed", key: "methodNotAllowed" },
  notAcceptable:      { code: 406, msg: "Not acceptable", key: "notAcceptable" },
  conflict:           { code: 409, msg: "Conflict", key: "conflict" },
  gone:               { code: 410, msg: "Gone", key: "gone" },
  unsupportedMedia:   { code: 415, msg: "Unsupported media type", key: "unsupportedMedia" },
  unprocessable:      { code: 422, msg: "Unprocessable entity", key: "unprocessable" },
  tooManyRequests:    { code: 429, msg: "Too many requests", key: "tooManyRequests" },

  internal:           { code: 500, msg: "Internal server error", key: "internal" },
  notImplemented:     { code: 501, msg: "Not implemented", key: "notImplemented" },
  badGateway:         { code: 502, msg: "Bad gateway", key: "badGateway" },
  serviceUnavailable: { code: 503, msg: "Service unavailable", key: "serviceUnavailable" },
  gatewayTimeout:     { code: 504, msg: "Gateway timeout", key: "gatewayTimeout" },

  invalidToken:       { code: 401, msg: "Invalid or expired token", key: "invalidToken" },
  missingToken:       { code: 401, msg: "Authorization token missing", key: "missingToken" },
  invalidParams:      { code: 400, msg: "Invalid parameters", key: "invalidParams" },
  invalidBody:        { code: 400, msg: "Invalid request body", key: "invalidBody" },
  missingFields:      { code: 400, msg: "Required fields are missing", key: "missingFields" },
  validationFailed:   { code: 422, msg: "Validation failed", key: "validationFailed" },
  dbConnection:       { code: 500, msg: "Database connection error", key: "dbConnection" },
  firebaseInit:       { code: 500, msg: "Firebase not initialized correctly", key: "firebaseInit" },
  originNotAllowed:   { code: 403, msg: "Origin not allowed", key: "originNotAllowed" },

  fileTooLarge:       { code: 413, msg: "Uploaded file is too large", key: "fileTooLarge" },
  fileFormatInvalid:  { code: 415, msg: "Invalid file format", key: "fileFormatInvalid" },
  fileNotFound:       { code: 404, msg: "File not found", key: "fileNotFound" },

  unknown:            { code: 500, msg: "An unknown error occurred", key: "unknown" },
};
