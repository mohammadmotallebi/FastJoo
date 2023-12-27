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
    f7, Link, Icon, Toolbar
} from 'framework7-react';
import store from "../js/store";
import config from "../config";

export default () => {
    return (
        <Page>
            <Navbar title="Register">
                <Link slot="left" back>
                    <Icon f7="multiply_circle_fill"/>
                </Link>
            </Navbar>
            <List form>
                <ListInput
                    label="Name"
                    type="text"
                    placeholder="Enter Your Name"
                    outline
                    floatingLabel
                />
                <ListInput
                    label="Email"
                    type="email"
                    placeholder="Enter Your Email"
                    outline
                    floatingLabel
                />
                <ListInput
                    label="Password"
                    type="password"
                    placeholder="Enter Your Password"
                    outline
                    floatingLabel
                />
                <ListInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Enter Your Password Again"
                    outline
                    floatingLabel
                />
                <ListInput
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    outline
                    floatingLabel
                />
            </List>
            <Block>
                <Button fill raised large onClick={() => {
                    f7.dialog.alert("Register Success");
                    f7.views.main.router.navigate("/login/");
                }}>Register</Button>
            </Block>
        </Page>
    )
}