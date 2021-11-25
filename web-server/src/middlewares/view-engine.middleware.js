import path from 'path'

export const VIEW_PATH = path.join(process.cwd(), 'src', 'views')

// @desc    Middleware to render all html files with Nunjucks
export function viewEngine(request, response) {
  // show original URL in the console
  console.log('Original URL: %s', request.originalUrl)

  // generate path to view
  let viewPath = path.join(VIEW_PATH, request.originalUrl)

  // replace *.html to *.njk
  viewPath = viewPath.replace(/\..+/, '.njk')

  console.log('File to render: %s', viewPath)

  // render template
  response.render(viewPath)
}
