import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {api, api_auth} from './api'

const initialState = {
	isLoggedin: false,
	logged_user: {},
	isLoading: false,
	error: false,
}

export const loginUser = createAsyncThunk("LoginUser", async (userData, thunkAPI)=>{
	try{
		const response = await api.post("/accounts/token/",userData)
		return response.data
	}catch(error){
		return thunkAPI.rejectWithValue(error.response.data)
	}
})

export const signupUser = createAsyncThunk("SignupUser", async (userData, thunkAPI)=>{
	try{
		const response = await api.post("/accounts/", userData)
		return response.data
	}catch(error){
		return thunkAPI.rejectWithValue(error.response.data)
	}
})

export const getUser = createAsyncThunk("GetUser", async (userData, thunkAPI)=>{
	try{
		const response = await api_auth.get("/accounts/"+userData.email)
		return response.data
	}catch(error){
		return thunkAPI.rejectWithValue(error.response.data)
	}
})

const userSlice = createSlice({
	name: "User",
	initialState,

	extraReducers: (builder)=>{

		// ----------Login User
		builder.addCase(loginUser.pending, (state, action)=>{
			state.isLoading = true
		});
		builder.addCase(loginUser.fulfilled, (state, action)=>{
			const auth_tokens = JSON.stringify(action.payload)
			localStorage.setItem('auth_tokens', auth_tokens)
			state.isLoggedin = true
			state.isLoading = false
			state.error = false
		});
		builder.addCase(loginUser.rejected, (state, action)=>{
			state.error = true
			console.log("Login Error: ", action.payload)
			state.isLoading = false
		});


		// --------signup User
		builder.addCase(signupUser.pending, (state, action)=>{
			state.isLoading = true
		});
		builder.addCase(signupUser.fulfilled, (state, action)=>{
			state.isLoading = false
			state.error = false
		});
		builder.addCase(signupUser.rejected, (state, action)=>{
			state.error = true
			state.isLoading = false
		});


		// -----------GetUser
		builder.addCase(getUser.pending, (state, action)=>{
			state.isLoading = true
		});
		builder.addCase(getUser.fulfilled, (state, action)=>{
			state.logged_user = action.payload
			state.isLoading = false
			state.error = false

		});
		builder.addCase(getUser.rejected, (state, action)=>{
			state.error = true
			state.isLoading = false
		});
	}
})

export default userSlice.reducer