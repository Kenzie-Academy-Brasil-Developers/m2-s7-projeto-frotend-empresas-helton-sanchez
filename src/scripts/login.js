import { login, verifyTypeUser } from "./request.js"

export function toDashboard() {
    const goToLogin = document.querySelector('.goLogin')
    const inputLogin = document.querySelectorAll('.inputLogin')

    goToLogin.addEventListener('click', async (event) => {
        event.preventDefault()
        const loginBody = {}
        inputLogin.forEach(input => {

            loginBody[input.name] = input.value
        })


        const loginUser = await login(loginBody)

        userVerify()
    })
}

async function userVerify() {
    const token = localStorage.getItem('@loginEmpresa:token');
    const isAdmin = await verifyTypeUser(token);
    // return isAdmin;
    if(isAdmin){
        window.location.replace('../pages/admin.html')
    }else{
        window.location.replace('../pages/dashboard.html')
    }
}

toDashboard()