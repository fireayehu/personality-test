import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  fetchSingleQuestionLoading: false,
  submitAnswerLoading: false,
  singleQuestion: null,
  question: {},
  result: null,
  fetchSingleQuestionError: null,
  submitAnswerError: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState: INITIAL_STATE,
  reducers: {
    fetchSingleQuestionStart: (state) => {
      return {
        ...state,
        fetchSingleQuestionLoading: true,
        fetchSingleQuestionError: null,
        singleQuestion: null,
        result: null,
        question: {},
      };
    },
    fetchSingleQuestionSuccess: (state, { payload: { question } }) => {
      return {
        ...state,
        fetchSingleQuestionLoading: false,
        singleQuestion: question,
      };
    },
    fetchSingleQuestionError: (state, { payload: { error } }) => {
      return {
        ...state,
        fetchSingleQuestionLoading: false,
        fetchSingleQuestionError: error,
      };
    },
    fetchQuestionStart: (state, { payload: { id } }) => {
      return {
        ...state,
        question: {
          ...state.question,
          [id]: {
            loading: true,
          },
        },
      };
    },
    fetchQuestionSuccess: (state, { payload: { id, question } }) => {
      return {
        ...state,
        question: {
          ...state.question,
          [id]: {
            loading: false,
            data: question,
          },
        },
      };
    },
    fetchQuestionError: (state, { payload: { id, error } }) => {
      return {
        ...state,
        question: {
          ...state.question,
          [id]: {
            loading: false,
            error,
          },
        },
      };
    },
    submitAnswerStart: (state) => {
      return {
        ...state,
        submitAnswerLoading: true,
        submitAnswerError: null,
      };
    },
    submitAnswerSuccess: (state, { payload: { result } }) => {
      return {
        ...state,
        submitAnswerLoading: false,
        result,
      };
    },
    submitAnswerError: (state, { payload: { error } }) => {
      return {
        ...state,
        submitAnswerLoading: false,
        submitAnswerError: error,
      };
    },
  },
});

export const {
  fetchSingleQuestionStart,
  fetchSingleQuestionSuccess,
  fetchSingleQuestionError,
  fetchQuestionStart,
  fetchQuestionSuccess,
  fetchQuestionError,
  submitAnswerStart,
  submitAnswerSuccess,
  submitAnswerError,
} = questionSlice.actions;

export default questionSlice.reducer;
