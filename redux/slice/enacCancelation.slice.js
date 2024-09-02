import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enacCancel: {},
}

export const enacCancelSlice = createSlice({
  name: 'enacCanceldata',
  initialState,
  reducers: {
    setEnacCancel: (state, action) => {
      state.enacCancel = action.payload 
    },
  },
});

export const { setEnacCancel } = enacCancelSlice.actions;
export default enacCancelSlice.reducer;