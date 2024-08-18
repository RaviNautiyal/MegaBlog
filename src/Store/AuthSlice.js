import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status:false,
    data:null
}

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,actions)=>{
            state.status = true
            state.data = actions.payload
        },

        logout:(state,actions)=>{
            state.status = false
            state.data = null
        }
        
    }



})
export  const {login, logout} = AuthSlice.actions

export  default AuthSlice.reducer