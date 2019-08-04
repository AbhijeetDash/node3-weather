const form = document.querySelector('form')
const search = document.querySelector('input')

const place = document.querySelector('#place')
const one = document.querySelector('#One')
const two = document.querySelector('#Two')
const three = document.querySelector('#Three')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    var location = search.value
    place.style.color = "black";
    place.textContent = "Loading..."
    one.textContent = ''
    two.textContent = ''
    three.textContent = ''

    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                place.style.color = "red";
                place.textContent = data.error
            } else {
                place.textContent = data.place
                one.textContent = `Your timezone is ${data.timezone}`
                two.textContent = data.summary
                three.textContent = `It's currently ${data.temperature} *c, there is a ${data.precipProbability}% 
                                    chance of rain. Windspeed is ${data.windSpeed} knots.`
            }
            console.log(data)
        })
    })
})