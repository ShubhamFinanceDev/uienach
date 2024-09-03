import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applicationDetails: {},
  loansDetails : []
}

export const enacCancelSlice = createSlice({
  name: 'enacCanceldata',
  initialState,
  reducers: {
    setEnacCancel: (state, action) => {
      state.applicationDetails = action.payload.applicationDetails 
      state.loansDetails = action.payload.loansDetails 
    },
  },
});

export const { setEnacCancel } = enacCancelSlice.actions;
export default enacCancelSlice.reducer;