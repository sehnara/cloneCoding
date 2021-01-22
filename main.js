"use strict";

function getData(){
    return fetch('./data/data.json')
    .then(response=>response.json())
    .then(json => {
        console.log(json.items);
        return json.items;
    });
}

getData()
.then(items =>{
    displayList(items);
    setEventListeners(items);
})
.catch(console.log);

function displayList(items){
    //sehoon 방법1 /////////////////////////////////////////////////////////////////////////////////////////////

    // const itemList = document.querySelector('.items');
    // let stringItemList = '';

    // items.forEach(item => {        
    //     stringItemList+=`<li class="item">
    //     <img src="${item.image}" alt="item">
    //     <span class="details"> ${item.gender}, ${item.size}</span>
    //     </li>`;
    // });
    // itemList.innerHTML = stringItemList;

    //Dream 방법 2 /////////////////////////////////////////////////////////////////////////////////////////////
    const itemList = document.querySelector('.items');
    itemList.innerHTML = items.map(item=>createHTMLstring(item)).join('');
}
function createHTMLstring(item){
    return `
    <li class="item">
    <img src="${item.image}" alt="item">
    <span class="details"> ${item.gender}, ${item.size}</span>
    </li>
    `;
}

function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.menu'); //이벤트 위임 : 버튼이 들어있는 컨테이너 자체에 이벤트 등록, 한 곳에서만 컨트롤 가능
    
    logo.addEventListener('click',()=>{
        displayList(items);
    });

    buttons.addEventListener('click',event=>onButtonClick(event,items));
}

function onButtonClick(event, items){
   const dataset = event.target.dataset;
   const key = dataset.key;
   const value = dataset.value;

   if(key==null || value ==null) return;

   const filtered = items.filter(item => item[key]===value);
   displayList(filtered);
}

