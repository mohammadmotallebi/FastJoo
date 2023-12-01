
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
import  store from "../js/store";
import {useStore} from "framework7-react";




const routes = [
    {
        path: '/',
        component: HomePage,
        beforeEnter: function async({resolve, reject}) {
            const user = useStore(store, 'user');
            console.log('beforeEnter', user)
                const router = this;
                if (!user.value?.logged_in) {
                    reject();
                    router.navigate('/login/');
                    return;
                }
                resolve();
        }
    },
    {
      path: '/about/',
      component: AboutPage,
    },
    {
      path: '/profile/',
        component: Profile,
        async: function ({ app, to, resolve }) {
            const user = store.getters.user;
            console.log('beforeEnter', user)
            const router = this;
            if (!user.value?.logged_in) {
                router.navigate('/login/');
                return;
            }
            resolve();
        },
        beforeEnter: function async({resolve, reject}) {
            const user = useStore(store, 'user');
            console.log('beforeEnter', user)
            const router = this;
            if (!user.value?.logged_in) {
                reject();
                router.navigate('/login/');
                return;
            }
            resolve();
        },
      options: {
        transition: 'f7-cover-v',
        openIn: 'popup',
      },
    },
    {
      path: '/add/',
      component: AddItem,
      options: {
        transition: 'f7-cover-v',
        openIn: 'popup',
      },
    },
    {
      path: '/edit/:id',
      component: UpdateItem,
      options: {
        transition: 'f7-cover-v',
        openIn: 'popup',
      },
    },
    {
      path:'/messages/',
        component: MessagePage,
        async: function ({ app, to, resolve }) {
            const user = store.getters.user;
            console.log('beforeEnter', user)
            const router = this;
            if (!user.value?.logged_in) {
                router.navigate('/login/');
                return;
            }
            resolve();
        },
        beforeEnter: function async({resolve, reject}) {
            const user = useStore(store, 'user');
            console.log('beforeEnter', user)
            const router = this;
            if (!user.value?.logged_in) {
                reject();
                router.navigate('/login/');
                return;
            }
            resolve();
        }
    },
    {
      path: '/login/',
      component: LoginPage,
    },
    {
      path: '/logout/',
      async: function ({ app, to, resolve }) {
        fetch(`${config.API_URL}/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: config.HEADER
        })
            .then((res) => {
              if (res.status === 200) {
                app.dialog.alert('You have been logged out');
                resolve(
                    {
                      component: LoginPage,
                    },
                    {
                      reloadCurrent: true,
                    }
                );
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
