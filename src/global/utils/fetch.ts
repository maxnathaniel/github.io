export enum RequestMethods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

class FetchError extends Error {
  data: any;
  status = 0;
}

async function handleResponseError(res: Response) {
  let data;

  try {
    data = await res.json();
  } catch (error) {
    throw new Error(res.statusText);
  }
  const msg = data.message ?? res.statusText;
  const err = new FetchError(msg);
  err.data = data;
  err.status = res.status;

  throw err;
}

export async function fetchit(input: RequestInfo) {
  const options: RequestInit = {};
  // TODO: to implement headers
  // const defaultHeaders = { 'Content-Type': 'application/json' };
  // options.headers = defaultHeaders;

  const res = await fetch(input, options);

  if (!res.ok) {
    await handleResponseError(res);
  }

  return res;
}