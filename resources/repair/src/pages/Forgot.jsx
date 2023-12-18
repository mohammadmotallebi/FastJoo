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
    f7, Link, Icon,Toolbar
} from 'framework7-react';
import store from "../js/store";
import config from "../config";

export default () => {
    return (
        <Page>
            <Navbar title="Recover Your Password">
                <Link slot="left" back>
                    <Icon f7="multiply_circle_fill" />
                </Link>
            </Navbar>
            <Block strong>
                <p>Enter your email address below and we'll send you a link to reset your password.</p>
            </Block>
            <List form>
                <ListInput
                    label="Email"
                    type="email"
                    placeholder="Enter Your email"
                    outline
                    floatingLabel
                />
            </List>
            <Block>
                <Button fill raised large onClick={() => f7.dialog.alert('A recovery link was sent to your email. Please check your inbox.', 'Recovery Link Sent')}>Send Recovery Link</Button>
            </Block>
        </Page>
    )
}