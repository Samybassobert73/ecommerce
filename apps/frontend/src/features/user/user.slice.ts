import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const USER_FEATURE_KEY = 'user';

/*
 * Update these interfaces according to your requirements.
 */
export interface UserEntity {
  _id: string;
  email?: string;
  name?: string;
}

export interface UserState extends EntityState<UserEntity, string> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const userAdapter = createEntityAdapter<UserEntity, string>({
  selectId: (userEntity: any) => userEntity._id,
});

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchUser())
 * }, [dispatch]);
 * ```
 */
export const fetchUser = createAsyncThunk<UserEntity[]>(
  'user/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getUsers()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialUserState: UserState = userAdapter.getInitialState({
  loadingStatus: 'not loaded',
  token: null,
  isAuthenticated: false,
  error: null,
});

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {
    add: userAdapter.addOne,
    remove: userAdapter.removeOne,
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      userAdapter.removeAll(state); // Optionally, clear user data on logout
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      console.log('action', action);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchUser.fulfilled,
        (state: UserState, action: PayloadAction<UserEntity[]>) => {
          userAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const userReducer = userSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(userActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const userActions = userSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllUser);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = userAdapter.getSelectors();

export const getUserState = (rootState: {
  [USER_FEATURE_KEY]: UserState;
}): UserState => rootState[USER_FEATURE_KEY];

export const selectAllUser = createSelector(getUserState, selectAll);

export const selectUserEntities = createSelector(getUserState, selectEntities);

export const selectIsAuthenticated = createSelector(
  getUserState,
  (state: UserState) => state.isAuthenticated
);
export const selectToken = createSelector(
  getUserState,
  (state: UserState) => state.token
);
