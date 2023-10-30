import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useRouter } from 'next/navigation';
import type { RootState } from "@redux/store";
import {setToken, setUser, setIsLoggedIn, setIsLoading, setError} from "@redux/slices/authSlice";




export const logout = () => {
    const router = useRouter()
    router.push('pages/login')
}

export const redirect = (path: string) => {
    const router = useRouter()
    router.push(path)
}
// @ts-ignore
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Accept', 'application/json')
            headers.set('X-API-KEY', 'x4CsiyWKKNSl1P3FS2vWPwiGhwTLdqUCVynogB3rEvFtRJLTs8aEBZywfAAL')
            return headers
        }
    }),
    endpoints: (build) => ({
        login: build.query({
            query: (body : {email: string, password: string}) => ({
                url: 'login',
                method: 'POST',
                body
            }),
            // @ts-ignore
            onQueryStarted(arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void {
                console.log('onQueryStarted', api)
                setIsLoading(true)
            },
            // @ts-ignore
            onQueryFulfilled(result: any, { dispatch }) {
                console.log('onQueryFulfilled', result, dispatch)
                setIsLoading(false)
                setIsLoggedIn(true)
                setUser(result.data.user)
                setToken(result.data.token)

            },

            // @ts-ignore
            onQueryRejected(error: any, { dispatch }) {
                console.log('onQueryRejected', error)
                setIsLoading(false)
                setIsLoggedIn(false)
                setError(error.data.message)
                setUser({})
            }
        }),
        register: build.query({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: build.query({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            // logout and redirect to login page
            // @ts-ignore
            onQueryStarted(arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void {
                console.log('onQueryStarted', api)
                logout()
            },
            // @ts-ignore
            onQueryFulfilled(result: any, { dispatch }) {
                console.log('onQueryFulfilled', result)
                dispatch(setUser({}))
                dispatch(setIsLoggedIn(false))
                redirect('/pages/login')
            },
            // @ts-ignore
            onQueryRejected(error: any, { dispatch }) {
                console.log('onQueryRejected', error)
                dispatch(setError(error.data.message))
                dispatch(setUser({}))
                dispatch(setIsLoggedIn(false))
                redirect('/pages/login')
            }
        }),
        auth: build.query({
            query: () => ({
                url: 'api/auth',
                method: 'GET',
            }),
            // @ts-ignore
            onQueryStarted(arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void {
                console.log('onQueryStarted', api)
                setIsLoading(true)
            },
            // @ts-ignore
            onQueryFulfilled(result: any, { dispatch }) {
                console.log('onQueryFulfilled', result)
                dispatch(setIsLoading(false))
                dispatch(setIsLoggedIn(result.data?.authenticated))
                dispatch(setUser(result.data.user))
            },
            // @ts-ignore
            onQueryRejected(error: any, { dispatch }) {
                console.log('onQueryRejected', error)
                setIsLoading(false)
                setIsLoggedIn(false)
                setError(error.data.message)
                setUser({})
                redirect('/pages/login')
            }
        }),
    })
});

export const {
    useLazyLoginQuery,
    useLazyRegisterQuery,
    useLazyAuthQuery,
    useLazyLogoutQuery
} = api;
export const { reducer, middleware } = api;
