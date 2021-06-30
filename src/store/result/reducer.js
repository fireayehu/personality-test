import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  fetchResultsLoading: false,
  results: null,
  fetchResultsError: null,
};

const resultSlice = createSlice({
  name: "result",
  initialState: INITIAL_STATE,
  reducers: {
    fetchResultsStart: (state) => {
      return {
        ...state,
        fetchResultsLoading: true,
        fetchResultsError: null,
      };
    },
    fetchResultsSuccess: (state, { payload: { results } }) => {
      return {
        ...state,
        fetchResultsLoading: false,
        results,
      };
    },
    fetchResultsError: (state, { payload: { error } }) => {
      return {
        ...state,
        fetchResultsLoading: false,
        fetchResultsError: error,
      };
    },
  },
});

export const { fetchResultsStart, fetchResultsSuccess, fetchResultsError } =
  resultSlice.actions;

export default resultSlice.reducer;
