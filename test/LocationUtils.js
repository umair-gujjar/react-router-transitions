import {expect} from 'chai';
import {createLocation, mergeLocations} from '../src/LocationUtils';

describe('LocationUtils', () => {
  describe('#createLocation', () => {
    describe('without location', () => {
      it('should return an object', () => {
        expect(createLocation(), 'createLocation() should return an object').to.eql({});
      });
    });

    describe('with a string', () => {
      it('should return an object with "pathname"', () => {
        expect(createLocation('/my/path'), 'createLocation() should return an object')
          .to.eql({
            pathname: '/my/path',
          });
      });
    });

    describe('with an object', () => {
      it('should return it', () => {
        expect(createLocation({
          pathname: '/my/path',
        }), 'createLocation() should return an object')
          .to.eql({
            pathname: '/my/path',
          });
      });
    });
  });

  describe('#mergeLocations', () => {
    describe('without argument', () => {
      it('should return an object', () => {
        expect(mergeLocations(), 'mergeLocations() should return an object').to.eql({});
      });
    });

    describe('with one location', () => {
      it('should clone location', () => {
        const location = {
          pathname: '/my/path',
          state: {
            id: 23,
          },
        };

        const result = mergeLocations(location);

        expect(result, 'mergeLocations() should clone location')
          .to.not.equal(location);
        expect(result, 'mergeLocations() should clone location')
          .to.eql(location);
      });
    });

    describe('with several locations', () => {
      describe('without state', () => {
        it('should merge them', () => {
          const location1 = {pathname: '/my/path1'};
          const location2 = {pathname: '/my/path2'};

          const result = mergeLocations(location1, location2);

          expect(result, 'mergeLocations() should merge locations')
            .to.eql({
              pathname: '/my/path2',
            });
        });
      });

      describe('with state', () => {
        it('should merge state', () => {
          const location1 = {
            state: {
              foo: 'bar',
            },
          };

          const location2 = {
            state: {
              bar: 'foo',
            },
          };

          const result = mergeLocations(location1, location2);

          expect(result, 'mergeLocations() should merge location states')
            .to.eql({
              state: {
                foo: 'bar',
                bar: 'foo',
              },
            });
        });
      });
    });
  });
});
