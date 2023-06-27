import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    user:null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    currentChatData:null,
    Login:false,
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        setUser : (state,action)=>{

            state.user = action.payload;


        },

        setToken : (state,action) =>{
            state.token = action.payload;
        } ,

        setCurrent : (state , action )=>{
            state.currentChatData = action.payload;
        } ,

        setLogin : (state,action) =>{
            state.Login = action.payload;
        }

    }
})


export const {setCurrent,setToken,setUser , setLogin} = authSlice.actions;

export default authSlice.reducer;