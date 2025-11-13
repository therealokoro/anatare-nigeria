export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event)

  if (!pathname) {
    return createError({
      statusCode: 404,
      statusMessage: 'File Not Found',
    })
  }

  setHeader(event, 'Content-Security-Policy', 'default-src \'none\';')
  return hubBlob().serve(event, pathname)
})