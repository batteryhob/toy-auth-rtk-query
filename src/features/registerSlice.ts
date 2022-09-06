import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface registerState {
  data: {
    name: string,
    phoneNumber: string,
    regNumber: string,
  };
  status: 'processing' | 'completed'
}

const initialState: registerState = {
  data: {
    name: "",
    phoneNumber: "",
    regNumber: "",
  },
  status: 'processing'
};

export const registreSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setRegisterStatus: (state, action: PayloadAction<'processing' | 'completed'>) => {
      state.status = action.payload;
    },
    init: (state) => {
      state.data = {
        name: "",
        phoneNumber: "",
        regNumber: "",
      };
      state.status = 'processing'
    }
  }
});

export const getRegisterState = (state: RootState) => state.register;

export const { setRegisterData, setRegisterStatus, init } = registreSlice.actions;

export default registreSlice.reducer;
