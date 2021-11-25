'use strict'

import express from 'express'
import morgan from 'morgan'
import 'express-async-errors'

import './utils/load-env-files.js'
import postsRoutes from './routers/posts.routers.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { notFound } from './middlewares/not-found.middleware.js'

const app = express()
const port = process.env.PORT || 5000

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use('/api/posts', postsRoutes)
  .use(notFound)
  .use(errorHandler)

app.listen(port, () =>
  console.info(`Application running at http://localhost:${port}`)
)

// export the support test
export default app
