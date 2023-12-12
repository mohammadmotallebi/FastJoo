import {createStore} from 'framework7/lite';
import {useQuery} from "react-query";
import config from "../config";
import {checkAuth} from "../api/API";

const store = createStore({
    state: {
        // User data
        user:{},
        isLoggedIn: false,
        panelOpen: true,

    },
    getters: {
        // User data
        user({ state }) {
            return state.user;
        },
        isLoggedIn({ state }) {
            return state.isLoggedIn;
        },
        panelOpen({ state }) {
            return state.panelOpen;
        },
    },
    actions: {
        async getUser({ state, dispatch }) {
            await fetch(`${config.API_URL}/auth`,{
                method: 'GET',
                headers: config.HEADER
            }).then(res => res.json())
                .then(async (data) => {
                    await dispatch('setIsLoggedIn', data?.logged_in)
                    if (data.logged_in) {
                        state.user = {...data.data, 'logged_in': true}
                        dispatch('setIsLoggedIn', true)
                    }else{
                        state.user = {'logged_in': false}
                        dispatch('setIsLoggedIn', false)
                    }

                })
        },

        setIsLoggedIn({ state }, value) {
            state.isLoggedIn = value;
        },

        setPanelOpen({ state }, value) {
            state.panelOpen = value;
        },
    },
})
export default store;
