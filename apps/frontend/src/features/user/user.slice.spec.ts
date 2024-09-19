import { fetchUser, userAdapter, userReducer } from './user.slice';

describe('user reducer', () => {
  it('should handle initial state', () => {
    const expected = userAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(userReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchUser', () => {
    let state = userReducer(undefined, fetchUser.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = userReducer(state, fetchUser.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = userReducer(state, fetchUser.rejected(new Error('Uh oh'), ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});
