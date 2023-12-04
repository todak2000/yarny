import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialUser } from "@/constant";
import { IInitialValues } from "@/types";



// Create a slice for user
const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (state: IInitialValues, action: any) => {
      return action.payload;
    },
    clearUser: () => {
      return initialUser;
    },
  },
});


export const { setUser, clearUser } = userSlice.actions;


// Create a Redux store that includes the posts slice
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
