/**
 * Merge locations recursively.
 *
 * @param {[]object} ...locations
 * @returns {object}
 */
export const mergeLocations = (...locations) => {
  return locations.reduce((res, loc) => {
    const newRes = {...res, ...loc};

    if (loc.state) {
      newRes.state = {...res.state, ...loc.state};
    }

    return newRes;
  }, {});
};

/**
 * Create a location from a string or an object.
 *
 * @param {string|object} location
 * @returns {object}
 */
export const createLocation = location => {
  if (typeof location === 'string') {
    return {pathname: location};
  }

  return location || {};
};
