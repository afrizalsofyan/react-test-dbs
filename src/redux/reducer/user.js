import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: [],
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const name = action.payload.name;
      const ektp = action.payload.ektp;
      const address = action.payload.address;
      const job = action.payload.job;
      const birth = action.payload.birth;
      const phone = action.payload.phone;
      const family = action.payload.dataFamily;
      const user = [{ name, ektp, address, job, birth, phone, family }];
      state.result.push(user);
    },
  },
});

export const { addUser } = user.actions;
export default user.reducer;
