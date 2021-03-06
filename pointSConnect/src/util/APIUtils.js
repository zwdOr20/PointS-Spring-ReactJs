import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import axios, { post } from 'axios';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
                .then(response => 
                    response.json().then(json => {
                        if(!response.ok) {
                            return Promise.reject(json);
                        }
                        return json;
                    })
                );
};

export function createRequete(requete){
    return request({
        url: API_BASE_URL + "/requetes",
        method: 'POST',
        body: JSON.stringify(requete)
    });
}

export function createOrder(requete){
    return request({
        url: API_BASE_URL + "/orders",
        method: 'POST',
        body: JSON.stringify(requete)
    });
}

export function createReply(requeteId, reply){
    return request({
        url: API_BASE_URL + "/requetes/" + requeteId,
        method: 'POST',
        body: JSON.stringify(reply)
    });
}

export function createEvent(myEvent) {
    const url = API_BASE_URL + "/Accueil/addEvent";
    const formData = new FormData();
    formData.append('file',myEvent.file);
    formData.append('title',myEvent.title);
    formData.append('description',myEvent.description);
    formData.append('date',myEvent.date);

    formData.append('content',myEvent.content);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
    .then(function (response) {
        console.log(response);
        return response;

      })
    .catch(function (error) {
        return Promise.reject(error) ;
        //error;
      }); 
}
export function createPromo(myEvent) {
    const url = API_BASE_URL + "/Accueil/addPromo";
    const formData = new FormData();
    formData.append('file',myEvent.file);
    formData.append('date',myEvent.date);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
    .then(function (response) {
        console.log(response);
        return response;

      })
    .catch(function (error) {
        return Promise.reject(error) ;
        //error;
      }); 
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function createAccount(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

