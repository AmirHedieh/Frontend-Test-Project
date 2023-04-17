export const NetworkUrls = {}

export const StatusCodes = {
  Backend: {
    success: 1,
    expiration: 10,
  },
  Http: {
    ok: 200,
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
