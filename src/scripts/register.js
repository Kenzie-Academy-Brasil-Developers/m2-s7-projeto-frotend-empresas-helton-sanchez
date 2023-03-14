import { registerUser, token } from "./request.js"

function createUser(){
    const inputs = document.querySelectorAll('input')
    const buttonRegister = document.querySelector('button')
    
    
    buttonRegister.addEventListener('click', async (event) =>{
      event.preventDefault()
      const newUser = {}
      
        inputs.forEach(async (input) => {
        
          newUser[input.name] = input.value
        })
        if(newUser){
          const request = await registerUser(newUser)
          const token = localStorage.setItem('@loginEmpresa:token', JSON.stringify(request))

          window.location.replace('../pages/login.html')

        }else{
          console.log("Erro no cadastro")
        }
    })

}

createUser()