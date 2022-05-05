// https://nodejs.org/api/events.html
import type _EventEmitter from 'node:events'

// @ts-ignore
import { EventEmitter } from './_events'

// @ts-ignore
export default <_EventEmitter> EventEmitter
