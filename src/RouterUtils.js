/**
 * Resolve all routes to get the complete paht.
 *
 * @param {object[]} routes
 * @returns {object}
 */
export const getCompleteRoutesPath = routes =>
  routes.reduce(
    (complete, { path = '' }) =>
      path.startsWith('/') ? path : complete.endsWith('/') ? `${complete}${path}` : `${complete}/${path}`,
    '',
  )

/**
 * Get route path.
 *
 * @param {object} options
 */
export const getRoutePath = (route, routes) => {
  const currentRouteIndex = routes.indexOf(route)
  const currentRoutes = routes.slice(0, currentRouteIndex + 1)
  return getCompleteRoutesPath(currentRoutes)
}
