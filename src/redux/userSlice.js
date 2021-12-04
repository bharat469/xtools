import { createSlice } from '@reduxjs/toolkit';

import { loginUser, newUser, transferOwner, nonAllocatedSearch, searchSSN } from './userService';

const initialState = {
	userName: '',
	userToken: '',
	isLoading: false,
	ssnList: [],
	serial_number: '',
	errorMessage: ''
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		clearStatus(state, { payload }) {
			state.isLoading = false;
			state.userName = '';
			state.userToken = '';
			state.errorMessage = '';
		},
		clearSSN(state, { payload }) {
			state.ssnList = [];
		},
		setSerial(state, { payload }) {
			state.serial_number = payload.serial_number;
		}
	},
	extraReducers: {
		[loginUser.fulfilled]: (state, { payload }) => {
			console.log(payload);
			state.isLoading = false;
			state.userToken = payload.data.token;
			state.userName = payload.data.first;
		},
		[loginUser.pending]: (state) => {
			state.isLoading = true;
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.errorMessage = 'Login failed: ' + payload.data.error;
		},
		[newUser.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			console.log(payload);
		},
		[newUser.pending]: (state) => {
			state.isLoading = true;
		},
		[newUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			console.log(payload);
		},
		[transferOwner.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			console.log(payload);
		},
		[transferOwner.pending]: (state) => {
			state.isLoading = true;
		},
		[transferOwner.rejected]: (state, { payload }) => {
			state.isLoading = false;
			console.log(payload);
		},
		[nonAllocatedSearch.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.ssnList = payload.data;
		},
		[nonAllocatedSearch.pending]: (state, { payload }) => {
			state.isLoading = true;
		},
		[nonAllocatedSearch.rejected]: (state, { payload }) => {
			state.isLoading = false;
			console.log(payload);
		},
		[searchSSN.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.ssnList = payload.data;
		},
		[searchSSN.pending]: (state, { payload }) => {
			state.isLoading = true;
		},
		[searchSSN.rejected]: (state, { payload }) => {
			state.isLoading = false;
			console.log(payload);
		}
	}
});

export const { clearStatus, setSerial, clearSSN } = userSlice.actions;

export default userSlice.reducer;
