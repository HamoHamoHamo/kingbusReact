import React, { useContext, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export { Api, tokenRefresh, IP };

const IP = process.env.REACT_APP_IP;
console.log("IPIPIP", IP);
const Api = axios.create({
    baseURL: IP,
    headers: {
        "content-type": "application/json"
    }
})

Api.interceptors.response.use(response => {
    
    console.log("request success");
    return response;
    }, err => {
        return new Promise(async(resolve,reject) => {
            //
            const refreshToken = cookies.get('token');
            console.log("RESPOSNE ERR", err);
            const originalReq = err.config;
            // console.log("originalReq", originalReq)

            if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
            {   
                originalReq._retry = true;
                const access = await tokenRefresh(refreshToken)
                console.log("GET ACCESS", access);

                
                originalReq.headers['Authorization'] = `Bearer ${access}`;
                
                // console.log("TEST", Api.defaults.headers);
                // console.log("ORIGINAL", originalReq);

                await axios(originalReq)
                .then(originalRes => {
                    console.log("ORIGINALRES", originalRes);
                    resolve(originalRes);
                })
                .catch(err => {
                    console.log("original err", err);
                });


                // console.log("RESOLVE");
                // resolve(res);
            }


        reject(err);
    });
});

async function tokenRefresh(refreshToken){
    let access = ''
    let res = await fetch(`${IP}/token/refresh`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({
            refresh: refreshToken
            
        }),
    }).then(res => res.json()).then(res => {
        // console.log("RES", res);
        access = res.access;
        Api.defaults.headers['Authorization'] = `Bearer ${access}`;
    });
    return access
};