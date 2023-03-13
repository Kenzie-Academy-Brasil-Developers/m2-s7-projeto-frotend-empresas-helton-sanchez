import { login, verifyTypeUser } from "./request.js"

function toDashboard() {
    const goToLogin = document.querySelector('.goLogin')
    const inputLogin = document.querySelectorAll('.inputLogin')

    goToLogin.addEventListener('click', async (event) => {
        event.preventDefault()
        const loginBody = {}
        inputLogin.forEach(input => {

            loginBody[input.name] = input.value
        })


        const loginUser = await login(loginBody)

    })
}

async function userVerify() {
    const token = localStorage.getItem('@loginEmpresa:token');
    const isAdmin = await verifyTypeUser(token);
    return isAdmin;
}

toDashboard()
userVerify()