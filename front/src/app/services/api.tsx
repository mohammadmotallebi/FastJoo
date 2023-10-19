// Create authentication user and store data in react & nextjs 13.5 using pages Router with react-redux &  redux-toolkit & RTK Query without axios with full code.
//
//     api link : http://localhost:8000/login
//     user_login : {
//         email:'',
//             password:''
//     }
//
// api link : http://localhost:8000/login
//     user_register : {
//         email:'',
//             password:''
//     }
//
// Router Structure:
//     /pages/login/page.js & layout.js
// /pages/register/page.js & layout.js
// /pages/forget/page.js & layout.js
//     .
//     .
//     .
//     I nedd  store, reducer, and other code for react-redux &  redux-toolkit & RTK Query
//
// please Generate Complete all page code with typescript  .tsx.

// Path: front/src/app/services/api.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAppSelector } from '@redux/store';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        prepareHeaders: (headers, { getState }) => {
            const token = useAppSelector((state) => state.auth.token);
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = api;
export const { reducer, middleware } = api;
