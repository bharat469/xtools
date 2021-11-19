import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../utils';

export const loginUser = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
	try {
		const response = await axios.post(`${API_URL}/login`, { email: email, password: password });

		if (response.status === 200) {
			return { ...response.data };
		} else {
			return thunkAPI.rejectWithValue(response.data);
		}
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const newUser = createAsyncThunk('user/addUser', async (body, thunkAPI) => {
	try {
		const response = await axios.post(`${API_URL}/customer/store`, body.formData, {
			headers: {
				Authorization: `Bearer ${body.token}`
			}
		});

		if (response.status === 200) {
			return { ...response.data };
		} else {
			return thunkAPI.rejectWithValue(response.data);
		}
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const transferOwner = createAsyncThunk('user/addUser', async (body, thunkAPI) => {
	try {
		const response = await axios.post(`${API_URL}/${body.serial_number}/transfer-ownership`, body.formData, {
			headers: {
				Authorization: `Bearer ${body.token}`
			}
		});

		if (response.status === 200) {
			return { ...response.data };
		} else {
			return thunkAPI.rejectWithValue(response.data);
		}
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const nonAllocatedSearch = createAsyncThunk('user/non-allocated-search', async (body, thunkAPI) => {
	try {
		const response = await axios.get(`${API_URL}/non-allocated-serial-number`, {
			headers: { Authorization: `Bearer ${body.token}` }
		});

		if (response.status === 200) {
			return { ...response.data };
		} else {
			return thunkAPI.rejectWithValue(response.data);
		}
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const searchSSN = createAsyncThunk('user/allocated-search', async (body, thunkAPI) => {
	try {
		const response = await axios.get(`${API_URL}/allocated-serial-number`, {
			headers: { Authorization: `Bearer ${body.token}` }
		});

		if (response.status === 200) {
			return { ...response.data };
		} else {
			return thunkAPI.rejectWithValue(response.data);
		}
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});
