# @hono/datadog

Datadog middleware for Hono.

## Usage

To use the Datadog middleware, you need to install the `dd-trace` package and then use the middleware in your Hono application.

```sh
yarn add dd-trace
```

```ts
import { Hono } from 'hono'
import { datadogMiddleware } from '@hono/datadog'

const app = new Hono()

app.use('*', datadogMiddleware())

app.get('/', (c) => c.text('Hello, Datadog!'))

app.fire()
```

## Example

Here is an example of how to use the Datadog middleware with Hono:

```ts
import { Hono } from 'hono'
import { datadogMiddleware } from '@hono/datadog'

const app = new Hono()

app.use('*', datadogMiddleware())

app.get('/', (c) => c.text('Hello, Datadog!'))

app.fire()
```

## Author

Hono Team

## License

MIT
