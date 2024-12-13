import '@yurkimus/response-status'

import { curry } from '@yurkimus/curry'
import { is } from '@yurkimus/types'

export let response = curry((headers, response) => {
  if (!is('Headers', headers))
    throw new TypeError(`Parameter 'headers' must be of type 'Headers'.`)

  if (!is('Response', response))
    throw new TypeError(`Parameter 'message' must be of type 'Response'.`)

  return new Response(
    response.body,
    {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers([...response.headers, ...headers]),
    },
  )
})

export let exception = reason => {
  if (reason instanceof Response) {
    return reason
  }

  if (reason instanceof Error) {
    return Response.json(
      {
        name: reason.name,
        message: reason.message,
      },
      ResponseStatus('Internal Server Error'),
    )
  }

  return Response.json(
    { message: `Unhandled exception.` },
    ResponseStatus('Internal Server Error'),
  )
}

export let notFound = () =>
  Response.json(
    { message: `Route not found.` },
    ResponseStatus('Not Found'),
  )

export let options = headers => {
  if (!is('Headers', headers))
    throw new TypeError(`Parameter 'headers' must be of Headers type.`)

  return new Response(
    null,
    {
      headers,
      ...ResponseStatus('No Content'),
    },
  )
}
