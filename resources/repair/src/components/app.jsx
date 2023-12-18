import React, {useState, useEffect} from 'react';
import {QueryClientProvider, QueryClient} from 'react-query'
import 'react-toastify/dist/ReactToastify.css';
import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    useStore, List, ListItem, Icon, NavLeft, NavTitle, BlockHeader
} from 'framework7-react';

import capacitorApp from '../js/capacitor-app';
import routes from '../js/routes';
import store from '../js/store';
import {getDevice, Dom7} from 'framework7';
import {Spin} from 'hamburger-react'
const MyApp = () => {
    // Login screen demo data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const device = getDevice();
    const user = useStore(store,'user')
    const isLoggedIn = useStore(store,'isLoggedIn');
    const panelOpen = useStore(store,'panelOpen');
    const [contentWidth, setContentWidth] = useState(f7?.width);
    // Framework7 Parameters
    const f7params = {
        name: 'ApexElectro Renewal', // App name
        theme: device.ios || device.desktop ? 'ios' : 'md', // Automatic theme detection
        darkMode: false,
        iosTouchRipple: true,
        mdTouchRipple: true,
        // App root data
        colors: {
            primary: '#144eff',
            green: '#618264',
            green_75: '#79AC78',
            green_50: '#B0D9B1',
            green_25: '#D0E7D2',
            red: '#EF4B4B',
            red_75: '#F17C7C',
            red_50: '#F6A7A7',
            red_25: '#F9CFCF',
            orange: '#ff8c1a',
            orange_75: '#FFB366',
            orange_50: '#FFCC99',
            orange_25: '#FFE6CC',
            blue: '#4d79ff',
            blue_75: '#668cff',
            blue_50: '#99b3ff',
            blue_25: '#ccebff',
            yellow: '#ffff4d',
            yellow_75: '#ffff66',
            yellow_50: '#ffff99',
            yellow_25: '#ffffcc',
            pink: '#ff4d88',
            pink_75: '#ff66a3',
            pink_50: '#ff99c2',
            pink_25: '#ffccdf',
            purple: '#b366ff',
            purple_75: '#cc99ff',
            purple_50: '#e6ccff',
            purple_25: '#f2e6ff',
            teal: '#00cccc',
            teal_75: '#00e6e6',
            teal_50: '#00ffff',
            teal_25: '#66ffff',
            lime: '#00e64d',
            lime_75: '#00ff66',
            lime_50: '#33ff99',
            lime_25: '#66ffcc',
            gray: '#cccccc',
            dark: '#333333',
            white: '#ffffff',
            black: '#000000',
        },
        // App store
        store,
        // App routes
        routes,
        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV === 'production' ? {
            path: '/service-worker.js',
        } : {},
        // Input settings
        input: {
            scrollIntoViewOnFocus: device.capacitor,
            scrollIntoViewCentered: device.capacitor,
        },
        // Capacitor Statusbar settings
        statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
        },
        // user
    };
    // f7ready(() => {
    //     // console.log('f7ready', store.getters.user)
    //     f7params.store.dispatch('getUser')
    //     const user = f7params.store.getters.user
    //     // f7params.store.getters.user.onUpdated(data => {
    //     //     console.log('user updated', data)
    //     //     if (data?.logged_in) {
    //     //         setUserLoggedIn(true)
    //     //     } else {
    //     //         setUserLoggedIn(false)
    //     //     }
    //     // })
    //     // console.log(isLoggedIn)
    //     // Init capacitor APIs (see capacitor-app.js)
    //     if (f7.device.capacitor) {
    //         capacitorApp.init(f7);
    //     }
    //     // Call F7 APIs here
    // });
    const handleContentWidth = () => {
        if(panelOpen && isLoggedIn){
            setContentWidth(f7.width - document.getElementById("panel-nested").offsetWidth)
        }else{
            setContentWidth(f7.width)
        }

    }

    if(device.desktop){
        useEffect(() => {

            handleContentWidth()
        }, [panelOpen, isLoggedIn])
    }


    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>

            <App {...f7params}>

                {/* Left panel with cover effect*/}
                {/*<Panel left cover dark >*/}
                {/*  <View>*/}
                {/*    <Page>*/}
                {/*      <Navbar title="Left Panel"/>*/}
                {/*      <Block>Left panel content goes here</Block>*/}
                {/*    </Page>*/}
                {/*  </View>*/}
                {/*</Panel>*/}


                {/*/!* Right panel with reveal effect*!/*/}
                {/*<Panel right reveal dark>*/}
                {/*  <View>*/}
                {/*    <Page>*/}
                {/*      <Navbar title="Right Panel"/>*/}
                {/*      <Block>Right panel content goes here</Block>*/}
                {/*    </Page>*/}
                {/*  </View>*/}
                {/*</Panel>*/}


                {/* Views/Tabs container */}

                    {device.desktop  ?
                            <div className='grid grid-cols-2'>
                            <Page id='panel-page'>
                                {isLoggedIn ? <Panel left

                               push
                               backdrop={false}
                               containerEl="#panel-page"
                               id="panel-nested"
                               opened={panelOpen}
                               onPanelClosed={() => store.dispatch('setPanelOpen', false)} closeByBackdropClick={true}
                               style={{backgroundColor: "white"}}
                               rippleColor="blue"
                        >
                            <div style={{
                                height: "90px",
                                backgroundColor: "rgba(var(--f7-navbar-bg-color-rgb, var(--f7-bars-bg-color-rgb)), var(--f7-bars-translucent-opacity))",
                                color: "white",
                                borderBottom: "1px solid rgba(0,0,0,0.2)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <img src='/assets/apex-logo.png' height="60px" alt=""/>

                            </div>
                                    <List menuList mediaList>
                                        <ListItem link='/' title="Home">
                                            <Icon md="material:home" ios="f7:house_fill" slot="media" size={24}/>
                                        </ListItem>
                                        <ListItem link='/shopping/' iconIos="f7:cart_fill" iconMd="material:shopping_cart" title="Shop">
                                            <Icon md="material:shopping_cart" ios="f7:cart_fill" slot="media" size={24}/>
                                        </ListItem>
                                        <ListItem link='/messages/' iconIos="f7:text_bubble_fill" iconMd="material:message" title="Messages">
                                            <Icon md="material:message" ios="f7:text_bubble_fill" slot="media" size={24}/>
                                        </ListItem>
                                        <ListItem link='/settings/' iconIos="f7:gear" iconMd="material:settings" title="Settings">
                                            <Icon md="material:settings" ios="f7:gear" slot="media" size={24}/>
                                        </ListItem>
                                    </List>

                        </Panel>: null}

                            <Page  style={{
                                width: contentWidth+'px',
                                transitionProperty: 'width',
                                transitionDuration: '0.2s',
                                transitionTimingFunction: 'ease-in-out',
                                transitionDelay: '0s',
                            }}>
                            {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
                            <Navbar id="navbar" sliding={false} style={{height:"90px"}}>
                                {isLoggedIn ? <NavLeft>
                                    <Link onClick={() => store.dispatch('setPanelOpen', !panelOpen)}>
                                        <Spin
                                            toggled={panelOpen}
                                            toggle={() => store.dispatch('setPanelOpen', !panelOpen)}
                                            color="black"
                                            size={24}
                                            easing="ease-in"
                                            duration={0.7}
                                            rounded={true}
                                            hideOutline={false}
                                        />
                                    </Link>
                                    <NavTitle sliding>
                                        <img src='/assets/apex-logo.png' height="60px" alt=""
                                             style={{
                                                 opacity: panelOpen ? 0 : 1,
                                                 marginLeft: panelOpen ? '-300px' : '0px',
                                                 transition: 'opacity 0.4s ease-in-out, margin 0.4s ease-in-out',
                                             }}
                                        />
                                    </NavTitle>
                                </NavLeft> :
                                    <NavLeft>
                                        <NavTitle sliding>
                                            <img src='/assets/apex-logo.png' height="60px" alt=""/>
                                        </NavTitle>
                                    </NavLeft>
                                }
                                {isLoggedIn && <NavRight>
                                    {/*Basket*/}
                                    <Link href="/basket/" style={{marginRight: "10px"}}>
                                        <Icon f7="cart_fill" size="32px" color="black"/>
                                    </Link>

                                    {/*user info and logout popover*/}
                                    <Link id='popover-menu' style={{marginRight: "150px"}} onClick={
                                        () => f7.popover.create({
                                            targetEl: '#popover-menu',
                                            content: `
                                            <div class="popover" style="width: 200px">
                                                <div class="popover-arrow"></div>
                                                <div class="popover-inner">
                                                    <div class="list media-list  list-outline-ios list-strong-ios list-dividers-ios">
                                                        <ul>
                                                            <li>
                                                                <a href="/profile/" class="item-link list-button popover-close">
                                                                <div class="item-content">
                                                                    <div class="item-media">
                                                                        <i class="icon f7-icons">person_fill</i>
                                                                    </div>
                                                                  <div class="item-inner">
                                                                    <div class="item-title-row">
                                                                            Profile
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="/logout/" class="item-link list-button popover-close">
                                                                 <div class="item-content">
                                                                    <div class="item-media">
                                                                        <i class="icon f7-icons">arrow_right_to_line_alt</i>
                                                                    </div>
                                                                  <div class="item-inner">
                                                                    <div class="item-title-row">
                                                                            Logout
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        `,
                                            on: {
                                                open: function (popover) {
                                                    console.log('Popover open');
                                                },
                                                opened: function (popover) {
                                                    console.log('Popover opened');
                                                },
                                            }
                                        }).open()
                                    }>
                                        <Icon f7="person_alt_circle_fill" size="32px" color="black"/>
                                    </Link>

                                </NavRight>}
                            </Navbar>
                                {/*<View id="view-home" main url="/"/>*/}
                                {/*<View id="view-message" name="message" url="/messages/"/>*/}
                                {/*<View id="view-login" name="login" url="/login/"/>*/}
                            <Views tabs className="safe-areas">
                            <View id="view-home" main tab tabActive url="/"/>

                            {/* Catalog View */}

                            {/* Catalog View */}
                            <View id="view-catalog" name="catalog" tab url="/shopping/"/>

                            {/* Message View */}
                            <View id="view-message" name="message" tab url="/messages/"/>

                            {/* Settings View */}
                            <View id="view-profile" name="profile" tab url="/profile/"/>
                                <View id="view-login" name="login" tab url="/login/"/>
                            </Views>
                            </Page>
                            </Page>
                            </div>

                        :
                        <Views tabs className="safe-areas">
                    <Toolbar tabbar icons bottom>
                        <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:home" text="Dash"/>
                        <Link tabLink="#view-catalog" iconIos="f7:cart_fill" iconMd="material:shopping_cart" text="Shop"/>
                        <Link tabLink="#view-message" iconIos="f7:text_bubble_fill" iconMd="material:message" text="Messages"/>
                        <Link tabLink="#view-settings" iconIos="f7:gear" iconMd="material:settings" text="Settings"/>
                    </Toolbar>

                    {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
                    <View id="view-home" main tab tabActive url="/"/>

                    {/* Catalog View */}
                    <View id="view-catalog" name="catalog" tab url="/catalog/"/>

                    {/* Message View */}
                    <View id="view-message" name="message" tab url="/messages/"/>

                    {/* Settings View */}
                    <View id="view-settings" name="settings" tab url="/settings/"/>
                </Views>
                    }

            </App>

        </QueryClientProvider>
    )
}
export default MyApp;