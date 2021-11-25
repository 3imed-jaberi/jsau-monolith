'use strict'

import express from 'express'
import morgan from 'morgan'
import nunjucks from 'nunjucks'
import 'express-async-errors'

import './utils/load-env-files.js'
import postsRoutes from './routers/posts.routers.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { notFound } from './middlewares/not-found.middleware.js'
import { VIEW_PATH, viewEngine } from './middlewares/view-engine.middleware.js'

const app = express()
const port = process.env.PORT || 5000

nunjucks.configure(VIEW_PATH, { express: app })

app
  .set('view engine', 'njk')
  .use('*.html', viewEngine)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use('/posts', postsRoutes)
  .use(notFound)
  .use(errorHandler)

app.listen(port, () =>
  console.info(`Application running at http://localhost:${port}`)
)

// export the support test
export default app
