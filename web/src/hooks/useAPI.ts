import axios from 'axios';

const http = axios.create();

http.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorMessage =
            (error.response?.data?.message || 'Something went wrong') +
            ', if it repeats please contact the dev team';
        return Promise.reject(errorMessage);
    }
);

export type HttpMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const makeAPICall = async (
    url: string,
    method: HttpMethodType,
    payload: object | null,
    headers = {}
) => {
    const response = await http.request({
        url,
        method,
        data: payload,
        headers
    });
    return response;
};
