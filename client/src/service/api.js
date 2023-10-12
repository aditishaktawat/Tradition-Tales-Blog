import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS} from '../constants/config.js';
import { getAccessToken, getType } from '../utils/common-utils.js';

const API_URL = "http://localhost:8000";

// common api
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
    
})

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE) {
       if (config.TYPE.params) {
           config.params = config.TYPE.params;
       } else if (config.TYPE.query) {
          config.url = config.url + '/' + config.TYPE.query;
       }
    }
       return config;
    },
    function(error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response) {
        // stop global loader here
        return processResponse(response);
    },
    function(error) {
        // stop global loader here
        return Promise.reject(processerror(error));
    }
)

// if success -> return


const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess:true, data: response.data}
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processerror = (error) => {
    if (error.response) {
        console.log('ERROR ON RESPONSE: ',error.response);
        return { 
           isError: true,
           msg: API_NOTIFICATION_MESSAGES.responseFailure,
           code: error.response.status
        }
    } else if (error.request){
        console.log('ERROR ON REQUEST: ',error.request);
        return { 
           isError: true,
           msg: API_NOTIFICATION_MESSAGES.requestFailure,
           code: ""
        }
    } else {
        console.log('ERROR ON NETWORK: ',error);
        return { 
           isError: true,
           msg: API_NOTIFICATION_MESSAGES.networkFailure,
           code: ""
    }
}
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showuploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showuploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showuploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }

        });
        API.usersignup = (userData) =>
        axiosInstance({
            method: 'POST', // Change this to the appropriate HTTP method (e.g., 'POST', 'PUT', 'GET', etc.)
            url: '/signup', // Replace with the actual signup API endpoint
            data: userData,
        });
    }

export {API};
