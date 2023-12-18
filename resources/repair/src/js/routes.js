import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
import LoginPage from "../pages/LoginPage";
import NotFoundPage from '../pages/404.jsx';
import {AddItem} from "../pages/AddItem";
import {UpdateItem} from "../pages/UpdateItem";
import MessagePage from "../pages/MessagePage";
import Profile from "../pages/Profile";
import config from "../config.json";
import Forgot from "../pages/Forgot";
import Register from "../pages/Register";


const authenticate = async () => {
    const auth = await fetch(`${config.API_URL}/auth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': config.X_API_KEY
        }
    })
    const authData = await auth.json()
    console.log('authData', authData)
    return !!authData.logged_in;

}

function checkAuth({app, to, resolve, reject}) {
    const router = this;
    authenticate().then((logged_in) => {
        if (!logged_in) {

            reject();
            router.navigate('/login/');
            return;
        }
        resolve();
    });
}

const routes = [
    {
        path: '/',
        async: function ({app, to, resolve, reject}) {

            const router = this;
            console.log('router', router)
            authenticate().then((logged_in) => {
                if (!logged_in) {
                    reject();
                    router.navigate('/login/');
                    return;
                }
                resolve(
                    {
                        component: HomePage,
                    },
                    {
                        reloadCurrent: true,
                    }
                );
            });
        },
    },
    {
        path: '/about/',
        component: AboutPage,
    },
    {
        path: '/forgot-password/',
        component: Forgot,
        options: {
            transition: 'f7-cover-v',
            openIn: 'popup',
        },
    },
    {
        path: '/register/',
        component: Register,
        options: {
            transition: 'f7-cover-v',
            openIn: 'popup',
        },
    },
    {
        path: '/profile/',
        component: Profile,
        beforeEnter: checkAuth,
        options: {
            transition: 'f7-cover-v',
            openIn: 'popup',
        },
    },
    {
        path: '/add/',
        component: AddItem,
        beforeEnter: checkAuth,
        options: {
            transition: 'f7-cover-v',
            openIn: 'popup',
        },
    },
    {
        path: '/edit/:id',
        component: UpdateItem,
        beforeEnter: checkAuth,
        options: {
            transition: 'f7-cover-v',
            openIn: 'popup',
        },
    },
    {
        path: '/messages/',
        component: MessagePage,
        beforeEnter: checkAuth,
    },
    {
        path: '/login/',
        component: LoginPage,
    },
    {
        path: '/logout/',
        async: function ({app, to, resolve}) {
            fetch(`${config.API_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: config.HEADER
            })
                .then((res) => {
                    if (res.status === 200) {
                        window.location.href = '/';
                        resolve();
                    } else {
                        app.dialog.alert('Logout failed');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;
