// https://nodejs.org/api/http.html
import type http from 'node:http'

import * as consts from './_consts'
import * as request from './_request'
import * as response from './_response'

export * from './_consts'
export * from './_request'
export * from './_response'

// @ts-ignore
export default <typeof http> {
  ...consts,
  ...request,
  ...response
}
