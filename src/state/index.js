import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current_level: 0,
    score: 0,
    words_found_atlevel: 0,
    current_word: '',
    word_matched: false,
    validwords:[],
    levels: [
        {
            id: 0,
            letters: ['F', 'O', 'G'],
            no_of_words: 3,
            word_sizes: [3, 2, 2],
        },
        {
            id: 1,
            letters: ['S', 'O', 'N'],
            no_of_words: 4,
            word_sizes: [3, 2, 2, 2],
        },
        {
            id: 2,
            letters: [ 'D', 'I', 'R','P'],
            no_of_words: 4,
            word_sizes: [4, 3, 3, 3],
        },
    ],
    game_completed: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setScore: (state) => {
      state.score += 1;
      if (state.score >= 3) {
        state.game_completed = true;
      }
    },
    setWordFound: (state) => {
      state.words_found_atlevel += 1;
    },
    setWordFoundReset: (state) => {
      state.words_found_atlevel = 0;
    },
    setword: (state, action) => {
      state.current_word = action.payload;
    },
    setLevel: (state) => {
      state.current_level += 1;
    },
    setWordMatched: (state, action) => {
      state.word_matched = action.payload;
    },
    setGameC:(state)=>{
      state.game_completed=true;
    },
    setGameF:(state)=>{
      state.game_completed=false;
    },
    setvaidWord:(state,action)=>{
      state.validwords=action.payload;
    }
  },
});

export const { setLevel, setScore, setWordFound, setWordFoundReset, setword, setWordMatched , setGameC, setGameF} =
  gameSlice.actions;
export default gameSlice.reducer;
