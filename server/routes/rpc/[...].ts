import { onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { orpcRouter } from '~~/server/utils/orpc.router';
import { BatchHandlerPlugin } from '@orpc/server/plugins'

const rpcHandler = new RPCHandler(orpcRouter, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
  plugins: [
    new BatchHandlerPlugin(),
  ],
})

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event)

  const { response } = await rpcHandler.handle(request, {
    prefix: '/rpc',
    context: {},
  })

  if (response) {
    return response
  }

  setResponseStatus(event, 404, 'Not Found')
  return 'Not Found'
})

