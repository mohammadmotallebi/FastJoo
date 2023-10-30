'use client'
import Dashboard from "@components/Dashboard";
import Menu from "@components/Menu";
import Loading from "@components/Loading";
import React from "react";
import store from '@redux/store'
export default function async () {
    const [isPageLoading, setIsPageLoading] = React.useState(true);

    React.useEffect(() => {
        // @ts-ignore
        store.dispatch({type: 'auth/auth'})
        if (store.getState().auth.isLoggedIn) {
            setIsPageLoading(false)
        }else {
            setIsPageLoading(true)
        }

    }, [])


    // @ts-ignore
    return (
        <div className="flex">
            <Loading open={isPageLoading}/>
            <Menu children={<Dashboard/>}/>
        </div>
    )
}