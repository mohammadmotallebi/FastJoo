
import config from '@/config';

export const fetchBrands = async () => {
   const result = await fetch(`${config.API_URL}/brands`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': config.X_API_KEY
        },
    })
    return result.json()
}
export const fetchTypes = async () => {
   const result = await fetch(`${config.API_URL}/types`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': config.X_API_KEY
        },
    })
    return result.json()
}
