import config from '@/config';

export const fetchBrands = async () => {
   const result = await fetch(`${config.API_URL}/brands`,{
        method: 'GET',
        headers: config.HEADER,
    })
    return result.json()
}
export const fetchTypes = async () => {
   const result = await fetch(`${config.API_URL}/types`,{
        method: 'GET',
        headers: config.HEADER,
    })
    return result.json()
}
export const getItemsList = async () => {
    const response = await fetch(`${config.API_URL}/get-items`, {
            method: 'GET',
            headers: config.HEADER
        });
    return await response.json();
}