import tracer from 'dd-trace'

tracer.init()

export const datadogMiddleware = () => {
  return async (c, next) => {
    const span = tracer.startSpan('hono.request', {
      resource: c.req.url,
      service: 'hono',
      type: 'web',
    })

    try {
      await next()
    } catch (error) {
      span.setTag('error', true)
      span.setTag('error.message', error.message)
      span.setTag('error.stack', error.stack)
      throw error
    } finally {
      span.finish()
    }
  }
}
