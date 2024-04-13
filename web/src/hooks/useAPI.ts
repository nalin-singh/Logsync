import axios from 'axios'
import toast from 'react-hot-toast/headless'

const http = axios.create()

http.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorMessage =
            (error.response?.data?.message || 'Something went wrong') +
            ', if it repeats please contact the dev team'
        toast.error(errorMessage)
        return Promise.reject(error)
    }
)

export type HttpMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const makeAPICall = async (
    url: string,
    method: HttpMethodType,
    payload: object | null,
    headers = {}
) => {
    try {
        const response = await http.request({
            url,
            method,
            data: payload,
            headers
        })
        return response
    } catch (error) {
        toast.error('Error Occured during API Call, try again')
        throw error
    }
}
