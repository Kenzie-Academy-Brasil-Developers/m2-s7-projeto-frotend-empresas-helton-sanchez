import { registerUser } from "./request.js"

function createUser(){
    const inputs = document.querySelectorAll('input')
    const buttonRegister = document.querySelector('.register')
    const newUser = {}


    buttonRegister.addEventListener('click', async (event) =>{
        event.preventDefault()

        inputs.forEach(input => {
        
          newUser[input.name] = input.value
        
        })

        const request = await registerUser(newUser)
    
    })

}

createUser()