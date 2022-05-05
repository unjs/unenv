// https://nodejs.org/api/process.html
import type process from 'node:process'

// @ts-ignore
import _process from './_process'

export default <typeof process> _process
