import { registerUser } from "./request.js"

function createUser(){
    const inputs = document.querySelectorAll('.input')
    const buttonRegister = document.querySelector('.register')
    
    
    buttonRegister.addEventListener('click', async (event) =>{
      event.preventDefault()
      const newUser = {}

        inputs.forEach(async (input) => {
        
          newUser[input.name] = input.value
        
        })

        const request = await registerUser(newUser)
        console.log(request)
    })

}

createUser()