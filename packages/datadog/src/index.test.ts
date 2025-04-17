import { Hono } from 'hono'
import { datadogMiddleware } from './index'

describe('Datadog Middleware', () => {
  const app = new Hono()

  app.use('*', datadogMiddleware())

  app.get('/hello', (c) => c.text('Hello, world!'))
  app.post('/data', (c) => c.json({ success: true }))

  it('Should return 200 response for GET /hello', async () => {
    const req = new Request('http://localhost/hello')
    const res = await app.request(req)
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Hello, world!')
  })

  it('Should return 200 response for POST /data', async () => {
    const req = new Request('http://localhost/data', {
      method: 'POST',
      body: JSON.stringify({ key: 'value' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const res = await app.request(req)
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })
  })

  it('Should handle errors correctly', async () => {
    app.get('/error', () => {
      throw new Error('Test error')
    })

    const req = new Request('http://localhost/error')
    const res = await app.request(req)
    expect(res).not.toBeNull()
    expect(res.status).toBe(500)
  })
})
