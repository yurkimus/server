import { ResponseStatus } from '@yurkimus/response-statuses'

/**
 * @param {Response} response
 */
export let response = response => {
  console.log('[server] response\n', response)

  return new Response(
    response.body,
    {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers([
        ...response.headers,
        ['Access-Control-Allow-Credentials', 'true'],
        ['Access-Control-Allow-Headers', '*'],
        ['Access-Control-Allow-Methods', '*'],
        ['Access-Control-Allow-Origin', '*'],
      ]),
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
