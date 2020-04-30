const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    
    const search = input.value

    fetch(`/weather?address=${search}`).then((res) => {
    res.json().then((data) => {
        if(data.error){
            messageOne.textContent = '';
            messageTwo.textContent = data.error
        } else {
            messageOne.textContent = '';
            
            messageTwo.textContent = `The temparature in ${data.location} is ${data.data.temperature}°C, but feels like ${data.data.feelslike}°C. Chances of rain is ${data.data.precip}%.`
        }
    })
})
    
})