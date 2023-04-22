export const NetworkUrls = {}

export const StatusCodes = {
  // Backend: {
  //   success: 1,
  //   expiration: 10,
  // },
  Http: {
    successCodes: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
    clientError: [
      400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424,
      425, 426, 428, 429, 431, 451,
    ],
    bad_request: 400,
    internal: 500,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    timeout: 408,
  },
}

export const Headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  compress: true,
}

export const TokenHeader = 'ofogh'

export const TimeoutTime = 5000
