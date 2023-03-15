import { onWorkerAtt, requestCoWorkers, searchUserOn, token } from "./request.js"

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
    const modalRender = document.querySelector('.modalPerfil')

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

        imgBluePen.addEventListener('click', (event) => {
            event.preventDefault()
    
            modalRender.showModal()
            editModal()
        })

        sectionPerfilUser.append(userName, boxData)
        boxData.append(email, levelJob, typeJob, imgBluePen)
        
}

function editModal() {
    const modalRender = document.querySelector('.modalPerfil')
    const input = document.querySelectorAll('input')
    const btnEnviar = document.querySelector('.btnEnviar')
    const btnClose = document.querySelector('span')
    
    btnEnviar.addEventListener('click', async(event) => {
        event.preventDefault()
        
        const inputPost = {}
        
        input.forEach((input) => {
            
            inputPost[input.name] = input.value
        })
        
        const tatu = await onWorkerAtt(token, inputPost)
        console.log(tatu)
        modalRender.close()
    })

    btnClose.addEventListener('click', () => {
        modalRender.close()
    })
    
}

async function renderCoWorker() {
    const section = document.querySelector('.sectionCoWorker')
    const div = document.querySelector('.divCoWorker')
    const ulAllUsers = document.querySelector('.coWorker')
    const renderUsers = await requestCoWorkers()

    
    renderUsers.forEach(element => {

        const titleh2 = document.querySelector('h2')

        const liAllUsers = document.createElement('li')
        const h3AllUsers = document.createElement('h3')
        const levelJob = document.createElement('p')


        h3AllUsers.innerText = element.username
        levelJob.innerText = element.professional_level

        titleh2.innerHTML = `${element.name} - ${element.description}`

        section.append(div)
        div.append(titleh2)
        
        ulAllUsers.appendChild(liAllUsers)
        liAllUsers.append(h3AllUsers, levelJob)

        
    });
}



renderCoWorker()
renderPerfil()