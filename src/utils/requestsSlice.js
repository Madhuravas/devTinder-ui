import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequestData: (state, action) => action.payload,
        removeRequest: (state, action) =>{
            let statedata = state.filter(item => item._id !== action.payload);
            return statedata
        }
    }
});

export const {addRequestData, removeRequest} = requestsSlice.actions

export default requestsSlice.reducer

