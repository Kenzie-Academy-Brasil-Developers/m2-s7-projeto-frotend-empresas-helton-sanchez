import { onWorkerAtt, requestUsers, searchUserOn, token } from "./request.js"

export async function logout () {
    const logoutButton = document.querySelector('.logout')

    logoutButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
        localStorage.clear()
    }) 
}
logout()

export async function renderPerfil () {
    const sectionPerfilUser = document.querySelector('.container__perfilUser')
    const renderPerfil = await searchUserOn(token)

        const userName = document.createElement('h2')
        const boxData = document.createElement('div')
        const email = document.createElement('p')
        const levelJob = document.createElement('p')
        const typeJob = document.createElement('p')
        const imgBluePen = document.createElement('img')

        userName.innerText = renderPerfil.username
        email.innerText = renderPerfil.email
        levelJob.innerText = renderPerfil.professional_level
        typeJob.innerText = renderPerfil.kind_of_work

        imgBluePen.src = '../assets/img/bluePen.png'
        imgBluePen.classList.add('pencilEdit')

        sectionPerfilUser.append(userName, boxData)
        boxData.append(email, levelJob, typeJob, imgBluePen)
        
}

function editPerfil () {
    const modalRender = document.querySelector('.modalPerfil')
    const buttonEdit = document.querySelector('.pencilEdit')

    buttonEdit.addEventListener('click', (event) => {
        console.log("oi")
        event.preventDefault()

        modalRender.showModal()
        editModal()
    })
}

function editModal() {
    const input = document.querySelectorAll('input')
    const btnEnviar = document.querySelector('button')
    
    btnEnviar.addEventListener('click', async(event) => {
        event.preventDefault()
        
        const inputPost = {}
        
        input.forEach((input) => {
            
            inputPost[input.name] = input.value
        })
        
     await onWorkerAtt(token, inputPost)
  
    })
    
}






renderPerfil()
editPerfil()
editModal()