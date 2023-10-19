import { createSlice } from '@reduxjs/toolkit';
import { api } from '@services/api';

const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.login.matchPending,
            (state, action) => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            api.endpoints.login.matchFulfilled,
            (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            }
        );
        builder.addMatcher(
            api.endpoints.login.matchRejected,
            (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.error = action.payload;
            }
        );
        builder.addMatcher(
            api.endpoints.register.matchPending,
            (state, action) => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            api.endpoints.register.matchFulfilled,
            (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            }
        );
        builder.addMatcher(
            api.endpoints.register.matchRejected,
            (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.error = action.payload;
            }
        );
    },
});

export const { setToken, setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;