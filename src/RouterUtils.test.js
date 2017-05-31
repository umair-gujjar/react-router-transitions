import { getCompleteRoutesPath, getRoutePath } from './RouterUtils'

describe('RouterUtils', () => {
  describe('#getCompleteRoutesPath', () => {
    describe('with one absolute route', () => {
      it('should return path', () => {
        expect(getCompleteRoutesPath([{ path: '/foo/bar' }])).toBe('/foo/bar')
      })
    })

    describe('with one relative route', () => {
      it('should return path prefixed with "/"', () => {
        expect(getCompleteRoutesPath([{ path: 'foo/bar' }])).toBe('/foo/bar')
      })
    })

    describe('with several routes', () => {
      describe('absolute, relative, relative', () => {
        it('should join path with "/"', () => {
          expect(
            getCompleteRoutesPath([{ path: '/initial/route' }, { path: 'second/route' }, { path: 'third/route' }]),
          ).toBe('/initial/route/second/route/third/route')
        })
      })

      describe('absolute, relative, absolute, relative', () => {
        it('should join from the last absolute', () => {
          expect(
            getCompleteRoutesPath([
              { path: '/initial/route' },
              { path: 'second/route' },
              { path: '/third/route' },
              { path: 'fourth/route' },
            ]),
          ).toBe('/third/route/fourth/route')
        })
      })
    })
  })

  describe('#getRoutePath', () => {
    it('should join the path to the route', () => {
      const routes = [
        { path: '/initial/route' },
        { path: 'second/route' },
        { path: 'third/route' },
        { path: 'fourth/route' },
      ]

      const route = routes[2]

      expect(getRoutePath(route, routes)).toBe('/initial/route/second/route/third/route')
    })
  })
})
