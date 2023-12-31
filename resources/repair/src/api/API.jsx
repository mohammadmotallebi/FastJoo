import config from '../config';
import store from '../js/store';
// Get Brands List
export const fetchBrands = async () => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/brands`, {
        method: 'GET',
        credentials: 'include',
        headers: config.HEADER,
    })
    return result.json()
}

// Get Types List
export const fetchTypes = async () => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/types`, {
        method: 'GET',
        credentials: 'include',
        headers: config.HEADER,
    })
    return result.json()
}

// Get Items List
export const getItemsList = async ({order, by}) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/get-items/${order}/${by}`, {
        method: 'GET',
        credentials: 'include',
        headers: config.HEADER
    });
    return await response.json();

}

// Delete Item By Id
export const deleteItemById = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/delete-item`, {
        method: 'DELETE',
        credentials: 'include',
        headers: config.HEADER,
        body: JSON.stringify({id})
    });
    return await response.json();
}

// Update Item By Id
export const updateItemById = async (id, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/update-item`, {
        method: 'POST',
        credentials: 'include',
        headers: config.HEADER,
        body: JSON.stringify({id, ...data})
    });
    return await response.json();
}

// Get Item By Id
export const getItemById = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/get-item`, {
        method: 'POST',
        credentials: 'include',
        headers: config.HEADER,
        body: JSON.stringify({id})
    });
    return await response.json();
}

// check auth
export const checkAuth = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
        method: 'GET',
        credentials: 'include',
        headers: config.HEADER
    });
    return await response.json();
}

// messages
export const getMessages = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/get-messages`, {
        method: 'POST',
        credentials: 'include',
        headers: config.HEADER
    });
    return await response.json();
}

// users
export const getUsers = async ({order, by}) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/get-users/${order}/${by}`, {
        method: 'GET',
        credentials: 'include',
        headers: config.HEADER
    });
    return await response.json();
}

// delete user
export const deleteUser = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/delete-user`, {
        method: 'DELETE',
        credentials: 'include',
        headers: config.HEADER,
        body: JSON.stringify({id})
    });
    return await response.json();
}
