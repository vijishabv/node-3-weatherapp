
console.log('client side javscript is loaded');
fetch('http://localhost:3000/weather?location=philadelphia').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else {
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const message1= document.querySelector('#messageone');
const message2=document.querySelector('#messagetwo');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const url='http://localhost:3000/weather?location='+search.value;
    messageone.textContent='loading message'
    fetch(url).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                messageone.textContent=data.error
            }else {
            console.log(data.location);
            messageone.textContent=data.location;
            console.log(data.forecast);
            messagetwo.textContent=data.forecast;
            }
        })
    })
})
