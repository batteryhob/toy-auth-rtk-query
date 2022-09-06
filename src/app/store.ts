import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

//리듀서
import counterReducer from '../features/counter/counterSlice';
import registerSlice from '../features/registerSlice';
import expireTimeSlice from '../features/expireTimeSlice';

//비동기 api
import { easysignApi } from '../services/easysignApi';
import { taxApi } from '../services/taxApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerSlice,
    expireTime: expireTimeSlice,
    [easysignApi.reducerPath]: easysignApi.reducer,
    [taxApi.reducerPath]: taxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(easysignApi.middleware)
      .concat(taxApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
