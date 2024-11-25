import { ResponseStatus } from '@yurkimus/response-statuses'

import { is } from '@yurkimus/types'

/**
 * @param {Headers} headers
 * @param {Response} response
 */
export let response = (headers, response) => {
  console.log('[server] response\n', response)

  if (!is('Headers', headers))
    throw new TypeError(`Parameter 'headers' must be of Headers type.`)

  if (!is('Response', response))
    throw new TypeError(`Parameter 'message' must be of Response type.`)

  return new Response(
    response.body,
    {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers([...response.headers, ...headers]),
    },
  )
}

/**
 * @param {*} reason
 */
export let exception = reason => {
  console.log('[server] exception\n', reason)

  if (reason instanceof Response) {
    return reason
  }

  if (reason instanceof Error) {
    return Response.json(
      {
        name: reason.name,
        message: reason.message,
      },
      { ...ResponseStatus.of('Internal Server Error') },
    )
  }

  return Response.json(
    { message: `Unhandled exception.` },
    { ...ResponseStatus.of('Internal Server Error') },
  )
}
