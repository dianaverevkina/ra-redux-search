import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  success: false,
  loading: false,
  error: null,
  search: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changSearchField (state, action) {
      state.search = action.payload
    },
    searchRequest(state) {
      state.loading = true
    },
    searchSuccess(state, action) {
      state.loading = false;
      state.items = action.payload
    },
    searchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export const {changSearchField, searchRequest, searchSuccess, searchFailure} = searchSlice.actions;
export default searchSlice.reducer;