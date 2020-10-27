// post(url: string,data: object)
// return promise

const API_URL = 'http://localhost:3000';

function request(url,method,data) {
    return fetch(API_URL + url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.error && res.message){
            alert(res.message);
        }
        return res;
    });
}

export const post = (url,data) => request(url, 'POST', data);
export const del = (url,data) => request(url, 'DELETE', data);

// post('/posts', {key: value})

// get()