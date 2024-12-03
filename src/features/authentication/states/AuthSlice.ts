import { createSlice } from "@reduxjs/toolkit";
import type  User  from "../types/User";
import  USERTYPE from "../types/UserType";

export interface AuthenticationSliceState {
    isAuthenticated: boolean;
    token: string | null;
    refreshToken: string | null;
    userType:USERTYPE;
    user: User | null;
  }

  const initialState: AuthenticationSliceState = {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    userType:USERTYPE.UNKNOWN,
    user: null,
  }

  const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthenticated(state,action : {payload: {token:string, user: User, userType:USERTYPE}} ){
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userType = action.payload.userType;
            state.user = action.payload.user;
        },

        login:(state,action)=>{
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userType = action.payload.userType;
            state.user = action.payload.user;
        },
        logout:(state)=>{
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            state.isAuthenticated = false;
            state.token = null;
            state.userType = USERTYPE.UNKNOWN;
            state.user = null;
        }
    },
    selectors: {
        selectIsAuthenticated: (state: AuthenticationSliceState) => state.isAuthenticated,
        selectToken: (state: AuthenticationSliceState) => state.token,
        selectUserType: (state: AuthenticationSliceState) => state.userType,
        selectUser: (state: AuthenticationSliceState) => state.user,
        selectRefreshToken: (state: AuthenticationSliceState) => state.refreshToken,
    },
  });


  export const { selectIsAuthenticated, selectToken, selectUserType, selectUser } = authSlice.selectors;
  export const {login,logout, setAuthenticated} = authSlice.actions;
  export default authSlice;