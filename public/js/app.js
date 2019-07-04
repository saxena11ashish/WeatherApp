//CLIENT SIDE JS, RUNS IN BROWSER 
console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') 
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// messageOne.textContent = 'From js'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()      //prevents default behaviour of refreshing the page 

    const location = search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent=data.error
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }        
        })
    })
})