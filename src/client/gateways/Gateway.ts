import request, {Request} from 'superagent'
import * as log from '../common/Logger'
import {get as _get, noop} from 'lodash'
import {errorMessage} from '../common/Utils'

// eslint-disable-next-line @typescript-eslint/ban-types
type ApiData = object | string

const ONE_MINUTES = 1000 * 60
const TIMEOUT = {
  response: ONE_MINUTES,
  deadline: ONE_MINUTES
}
const RETRIES = 1
const ACCEPT_HEADER = 'application/json; charset=utf-8'
const CONTENT_TYPE = 'application/json; charset=utf-8'

export const TIMEOUT_ERROR = 'Connection timeout calling the Nevergreen server'

export function post(url: string, data: ApiData, headers = {}): Request {
  return request
    .post(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function put(url: string, data: ApiData, headers = {}): Request {
  return request
    .put(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function patch(url: string, data: ApiData, headers = {}): Request {
  return request
    .patch(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function get(url: string, headers = {}): Request {
  return request
    .get(url)
    .accept(ACCEPT_HEADER)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export async function send<T>(request: Request): Promise<T> {
  try {
    const res = await request
    return (res.body || res.text) as T
  } catch (e) {
    const url = _get(e, 'url') as string || 'unknown'

    log.error(`An exception was thrown when calling URL '${url}'`, e)

    const message = _get(e, 'timeout')
      ? TIMEOUT_ERROR
      : _get(e, 'response.body.description') as string || errorMessage(e)

    throw new Error(message)
  }
}

export function fakeRequest(body: unknown): Request {
  return {body, abort: noop} as unknown as Request
}

export function isAbortedRequest(e: unknown): boolean {
  return errorMessage(e) === 'Aborted'
}
