import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const CART_FEATURE_KEY = 'cart';

/*
 * Update these interfaces according to your requirements.
 */
export interface CartEntity {
  _id: string;
  title: string;
  stock: number;
  qty: number;
}

export interface CartState extends EntityState<CartEntity, string> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  showCart: boolean;
}

export const cartAdapter = createEntityAdapter<CartEntity, string>({
  selectId: (cartEntity) => cartEntity._id,
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
 *   dispatch(fetchCart())
 * }, [dispatch]);
 * ```
 */
export const fetchCart = createAsyncThunk<CartEntity[]>(
  'cart/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getCarts()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialCartState: CartState = cartAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  showCart: false,
});

export const cartSlice = createSlice({
  name: CART_FEATURE_KEY,
  initialState: initialCartState,
  reducers: {
    addProduct: cartAdapter.addOne, // Ajoute un produit au panier
    addProducts: cartAdapter.addMany, // Ajoute plusieurs produits
    removeProduct: cartAdapter.removeOne, // Retire un produit
    updateProduct: cartAdapter.updateOne, // Met à jour un produit
    deacreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const product = state.entities[action.payload._id];
      if (product && product.qty > 0) {
        product.qty -= 1;
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const product = state.entities[action.payload._id];
      if (product) {
        product.qty += 1;
      }
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state: CartState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCart.fulfilled,
        (state: CartState, action: PayloadAction<CartEntity[]>) => {
          cartAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchCart.rejected, (state: CartState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const cartReducer = cartSlice.reducer;

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
 *   dispatch(cartActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const cartActions = cartSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllCart);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = cartAdapter.getSelectors();

export const getCartState = (rootState: {
  [CART_FEATURE_KEY]: CartState;
}): CartState => rootState[CART_FEATURE_KEY];

export const selectAllCart = createSelector(getCartState, selectAll);

export const selectCartEntities = createSelector(getCartState, selectEntities);
