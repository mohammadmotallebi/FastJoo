'use client'
import Dashboard from "@components/Dashboard";
import Menu from "@components/Menu";
import Layout from "@/app/layout";


export default function () {
    return (
        <Layout>
            <Menu>
                <Dashboard/>
            </Menu>
        </Layout>
    )
}