import React, {useState, useRef} from 'react';
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
    f7, Link, Icon,
} from 'framework7-react';
import config from "../config";

export default ({f7router}) => {
    const [loginScreenOpened, setLoginScreenOpened] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
        const url = `${import.meta.env.VITE_API_URL}/login`;
        const data = {email, password};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: config.HEADER
        }).then(res => res.json())
            .then(json => {
                console.log('Login: ', json);
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
            <LoginScreenTitle><img src="/assets/RENEWAL.png" width="180" height="180" alt=""/></LoginScreenTitle>
            <List form strong inset>
                <ListInput
                    label="Email"
                    outline
                    floatingLabel
                    type="text"
                    placeholder="Your Your Email"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                />
                <ListInput
                    label="Password"
                    type="password"
                    outline
                    floatingLabel
                    placeholder="Your password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}

                />
                <ListItem>
                    <div className="grid grid-cols-2 grid-gap width-100 margin-top">
                        <Button raised fill round onClick={signIn} large className="width-100" color="purple">
                            <Icon f7="person" size="24px" className="margin-right"/>
                            Sign In
                        </Button>
                        <Button raised fill round onClick={() => f7router.navigate('/register/')} large className="width-100" color="orange_75">
                            <Icon f7="person_badge_plus" size="24px" className="margin-right"/>
                            Sign Up
                        </Button>
                    </div>

                </ListItem>
                <ListItem>
                    <Link href="/forgot-password/">Forgot Password?</Link>
                </ListItem>

            </List>
        </Page>
    );
};