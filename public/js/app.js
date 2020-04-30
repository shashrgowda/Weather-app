const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')


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

            messageTwo.textContent = `Temperature   -   ${data.data.temperature}°C`
            messageThree.textContent = `Feels like  -   ${data.data.feelslike}°C`
            messageFour.textContent = `Chances of rain  -   ${data.data.precip}%`
            messageFive.textContent = `Humidity    -   ${data.data.humidity}%`
            
        }
    })
})
    
})