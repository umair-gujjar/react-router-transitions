/**
 * Resolve all routes to get the complete paht.
 *
 * @param {object[]} routes
 * @returns {object}
 */
export const getCompleteRoutesPath = routes => {
  return routes.reduce((complete, {path = ''}) => {
    return path.startsWith('/')
      ? path
      : complete.endsWith('/')
        ? `${complete}${path}`
        : `${complete}/${path}`;
  }, '');
};

/**
 * Get route path.
 *
 * @param {object} options
 */
export const getRoutePath = (route, routes) => {
  const currentRouteIndex = routes.indexOf(route);
  const currentRoutes = routes.slice(0, currentRouteIndex + 1);
  return getCompleteRoutesPath(currentRoutes);
};
