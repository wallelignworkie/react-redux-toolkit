import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface CounterState {
  count: number;
}

// Initial state
const initialState: CounterState = {
  count: 0,
};

// Create the slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
