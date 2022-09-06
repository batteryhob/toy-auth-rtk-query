import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ExpiredTimeState {
  data: {
    startedAt?: Date
    expiredAt?: Date
  };
}

const initialState: ExpiredTimeState = {
  data: {}
};

export const expireTimeSlice = createSlice({
  name: 'expireTime',
  initialState,
  reducers: {
    setExpireTime: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    init: (state) => {
      state.data = {};
    }
  }
});

export const getExpireTimeState = (state: RootState) => state.expireTime;

export const { setExpireTime, init } = expireTimeSlice.actions;

export default expireTimeSlice.reducer;
