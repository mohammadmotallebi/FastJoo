import React from 'react';
import {List, ListInput, Navbar, Page, useStore} from "framework7-react";
import store from "../js/store";
// Generate Code for user profile page
const Profile = () => {
    const user = useStore('user');
    return (
        <Page>
            <Navbar title="Profile" backLink="Back"/>
            <List strongIos dividersIos insetIos>
                <ListInput label="Name" type="text" placeholder="Your name" value={user?.name} onChange={(e) => {
                    store.dispatch('updateUser', {name: e.target.value});
                }} clearButton/>

                <ListInput label="E-mail" type="email" placeholder="Your e-mail" value={user?.email} onChange={(e) => {
                    store.dispatch('updateUser', {email: e.target.value});
                }} clearButton/>

                <ListInput label="Phone" type="text" placeholder="Phone" value={user?.phone} onChange={(e) => {
                    store.dispatch('updateUser', {phone: e.target.value});
                }} clearButton/>
            </List>
        </Page>
    );
};

export default Profile;