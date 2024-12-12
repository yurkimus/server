export let response: {
  (headers: Headers): (response: Response) => Response

  (headers: Headers, response: Response): Response
}

export let exception: {
  (reason: any): Response
}

export let notFound: {
  (): Response
}

export let options: {
  (headers: Headers): Response
}
