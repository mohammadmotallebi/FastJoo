import React, { useState, useRef } from 'react';
import {
    Navbar,
    Page,
    LoginScreen,
    ListInput,
    List,
    ListItem,
    Block,
    Button,
    LoginScreenTitle,
    BlockFooter,
    ListButton,
    f7,
} from 'framework7-react';
import store from "../js/store";
import config from "../config";

export default ({f7router}) => {
    const [loginScreenOpened, setLoginScreenOpened] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
        const url = `${config.API_URL}/login`;
        const data = {email, password};
         fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: config.HEADER
        }).then(res => res.json())
            .then(json => {
                console.log('Login: ',json);
                if (json.logged_in) {
                    // store.state.user(json.user)
                    // store.state.isLoggedIn(true);
                    // localStorage.setItem('token', json.token);
                    window.location.href = '/';
                } else {
                    f7.dialog.alert('Login failed!');
                }
            });
    };

    return (
                <Page loginScreen noToolbar>
                    <LoginScreenTitle><img src="/assets/RENEWAL.png" width="180" height="180"  alt=""/></LoginScreenTitle>
                    <List form>
                        <ListInput
                            label="Email"
                            type="text"
                            placeholder="Your Your Email"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                        />
                        <ListInput
                            label="Password"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}

                        />
                    </List>
                    <List inset>
                        <ListButton onClick={signIn}>Sign In</ListButton>
                        <BlockFooter>
                            Some text about login information.
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </BlockFooter>
                    </List>
                </Page>
    );
};