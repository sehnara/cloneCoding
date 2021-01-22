"use strict";

function getData(){
    return fetch('./data/data.json')
    .then(response=>response.json())
    .then(json => {
        console.log(json);
    });
}

getData();