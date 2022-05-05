import { notImplemented } from '../../../_internal/utils'
import type * as stramPromises from 'stream/promises'

export const finished = notImplemented('stream.promises.finished')
export const pipeline = notImplemented('stream.promises.pipeline')

export default <typeof stramPromises> {
  finished,
  pipeline
}
