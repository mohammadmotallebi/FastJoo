import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@redux/store'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Accept', 'application/json')
            headers.set('Content-Type', 'application/json')
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
            // // @ts-ignore
            // onQueryStarted(arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void {
            //     console.log('onQueryStarted', api)
            // },
            // // @ts-ignore
            // transformErrorResponse(baseQueryReturnValue: BaseQueryError<BaseQuery>, meta: BaseQueryMeta<BaseQuery>, arg: QueryArg): unknown {
            //     console.log('transformErrorResponse', baseQueryReturnValue)
            //     return baseQueryReturnValue
            // },
            // // @ts-ignore
            // transformResponse(baseQueryReturnValue: BaseQueryResult<BaseQuery>, meta: BaseQueryMeta<BaseQuery>, arg: QueryArg): unknown {
            //     console.log('transformResponse', meta)
            //     return baseQueryReturnValue
            // }
        }),
        register: build.mutation({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),
        auth: build.query({
            query: () => ({
                url: 'api/user',
                method: 'GET',
            }),
        }),
    })
});

export const {
    useLazyLoginQuery,
    useRegisterMutation,
    useLazyAuthQuery
} = api;
export const { reducer, middleware } = api;
