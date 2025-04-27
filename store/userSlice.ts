import { createSlice } from "@reduxjs/toolkit";

interface userType {
  isUser: boolean;
}

const initialState: userType = {
  isUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsers: (state) => {
      state.isUser = true;
    },
    removeUser: (state) => {
      state.isUser = false;
    },
  },
});

export const { addUsers, removeUser } = userSlice.actions;

export default userSlice.reducer;
