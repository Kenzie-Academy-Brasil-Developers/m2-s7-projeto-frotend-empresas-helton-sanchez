import { requestCompany, requestSectors, requestUsers, allDepartment, token, requestCreatDepartment, onWorkerAtt, userNotDepartment } from "./request.js";


export async function logout () {
    const logoutButton = document.querySelector('.logout')

    logoutButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
        localStorage.clear()
    })
}

logout()

const requestAllCompanies = await requestCompany()

// DEPARTAMENTOS

async function renderCompany(render) {
    const ulAllCompany = document.querySelector('.allCompany')
    ulAllCompany.innerHTML = ""
    
    render.forEach(element => {
        const liAllCompany = document.createElement('li')
        const departmentName = document.createElement('h3')
        const departmentDescription = document.createElement('p')
        const nameCompany = document.createElement('p')
        const boxImg = document.createElement('div')
        const imgEye = document.createElement('img')
        const imgPenBlack = document.createElement('img')
        const imgTrash = document.createElement('img')
        
        departmentName.innerText = element.sectors.description
        departmentDescription.innerText = element.description
        nameCompany.innerText = element.name
        boxImg.classList.add('boxImg')
        imgEye.src = '../assets/img/eye.png'
        imgPenBlack.src = '../assets/img/blackPen.png'
        imgTrash.src = '../assets/img/trash.png'
        
        ulAllCompany.appendChild(liAllCompany)
        liAllCompany.append(departmentName, departmentDescription, nameCompany, boxImg)
        boxImg.append(imgEye, imgPenBlack, imgTrash)
        
        return liAllCompany
    });
    
}
async function renderAllDepartment() {
    const renderAllDepartment = await allDepartment()
    const ulAllDepartment = document.querySelector('.allDepartment')

    renderAllDepartment.forEach(element => {

        const liAllUsers = document.createElement('li')
        const nameDepartment = document.createElement('h3')
        const descriptionDepartment = document.createElement('p')
        const boxImg = document.createElement('div')
        const imgPenEdit = document.createElement('img')
        const imgTrash = document.createElement('img')

        nameDepartment.innerText = element.name
        descriptionDepartment.innerText = element.description
        boxImg.classList.add('boxImg')
        imgPenEdit.src = '../assets/img/bluePen.png'
        imgPenEdit.classList.add('editDepartmentAdmin')

        imgTrash.src = '../assets/img/trash.png'

        ulAllDepartment.append(liAllUsers)
        liAllUsers.append(nameDepartment, descriptionDepartment, boxImg)
        boxImg.append(imgPenEdit, imgTrash)

    });
}
async function renderSectors() {
    const listSectors = document.querySelector('.selectCompany')
    
    
    listSectors.addEventListener('change', async (event) => {
        const sector = await requestSectors(event.target.value)
        renderCompany(sector)

    })
}

async function creatDepartment () {
    const buttonAddDepartment = document.querySelector('.criateDepartment')
    const modalAddDepartment = document.querySelector('.modalAddDepartment')
    

    buttonAddDepartment.addEventListener('click', (event) => {
        event.preventDefault()

        modalAddDepartment.showModal()

        editModalDepartment()
    })


}

async function editModalDepartment () {
    const modalRender = document.querySelector('.modalAddDepartment')
    const input = document.querySelectorAll('input')
    const btnEnviar = document.querySelector('.btnEnviar')
    const btnClose = document.querySelector('span')


    btnEnviar.addEventListener('click', async(event) => {
        event.preventDefault()
        
        const inputPost = {}
        
        input.forEach((input) => {
            
            inputPost[input.name] = input.value
        })
        
        await requestCreatDepartment(token, inputPost)
        modalRender.close()
    })

    btnClose.addEventListener('click', () => {
        modalRender.close()
    })
    
}

async function nameCompanyBySelect(){
    const namesCompany = await requestCompany()
    const selectCompanyAdmin = document.querySelector('.selectCriate')
    const selectCompanyCreate = document.querySelector('.selectCompany')


    namesCompany.forEach(element => {
        
        const options = document.createElement('option')

        options.innerText = element.name
        options.value = element.name

        selectCompanyCreate.append(options)
    })
    namesCompany.forEach(element => {
        
        const options = document.createElement('option')

        options.innerText = element.name
        options.value = element.name

        selectCompanyAdmin.append(options)
    })
}


// USERS
async function renderUsers() {
    const ulAllUsers = document.querySelector('.allUsers')
    const renderUsers = await requestUsers(token)
    
    renderUsers.forEach(element => {

        const liAllUsers = document.createElement('li')
        const h3AllUsers = document.createElement('h3')
        const levelJob = document.createElement('p')
        const nameCompany = document.createElement('p')
        const boxImg = document.createElement('div')
        const imgPenEdit = document.createElement('img')
        const imgTrash = document.createElement('img')

        h3AllUsers.innerText = element.username
        levelJob.innerText = element.professional_level
        nameCompany.innerText = element.name
        boxImg.classList.add('boxImg')

        imgPenEdit.src = '../assets/img/bluePen.png'
        imgPenEdit.classList.add('editUserAdmin')

        // modal edit user
        const modalEditUser = document.querySelector('.modalEditUser')
        const btnCloseEditUser = document.querySelector('.closeEditUser')
    
        imgPenEdit.addEventListener('click', (event) => {
            event.preventDefault()
    
            modalEditUser.showModal()

            modalChangeUserWork()
        })
        btnCloseEditUser.addEventListener('click', () => {
            modalEditUser.close()
        })

        imgTrash.src = '../assets/img/trash.png'
        
        ulAllUsers.appendChild(liAllUsers)
        liAllUsers.append(h3AllUsers, levelJob, nameCompany, boxImg)
        boxImg.append(imgPenEdit, imgTrash)

        
    });
}

async function editWorkUserBySelect(){
    const patchWorkUserApi = await requestUsers()
    const selectKindToUser = document.querySelector('#changeKindWorkUser')
    const selectProfessionalLevelToUser = document.querySelector('#changeProfessionalLevelUser')


    patchWorkUserApi.forEach(element => {
        
        const options = document.createElement('option')

        options.innerText = element.name
        options.value = element.name

        selectKindToUser.append(options)
    })
    patchWorkUserApi.forEach(element => {
        
        const options = document.createElement('option')

        options.innerText = element.name
        options.value = element.name

        selectProfessionalLevelToUser.append(options)
    })
}

async function modalChangeUserWork () {
    const modalRender = document.querySelector('.modalEditUser')
    const options = document.querySelectorAll('option')
    const btnEnviar = document.querySelector('.btnEnviar')
    const btnClose = document.querySelector('span')


    btnEnviar.addEventListener('click', async(event) => {
        event.preventDefault()
        
        const atualize = {}
        
        options.forEach((option) => {
            
            atualize[option.name] = option.value
        })
        
        const aranha = await changeWorkUser (id, token, atualize)
        console.log(aranha)
        modalRender.close()
    })

    btnClose.addEventListener('click', () => {
        modalRender.close()
    })
}

const userOffDepartment = await userNotDepartment(token)

async function renderUserNotDepartment(array) {
    const ulUserNotDepartment = document.querySelector('.userNotDepartment')

    array.forEach(element => {
        
        const liUserNotDepartment = document.createElement('li')
        const nameUserNotDepartment = document.createElement('h3')
        const boxImg = document.createElement('div')
        const imgPenEdit = document.createElement('img')
        const imgTrash = document.createElement('img')

        nameUserNotDepartment.innerText = element.username
        boxImg.classList.add('boxImg')
        imgPenEdit.src = '../assets/img/bluePen.png'
        imgPenEdit.classList.add('userNotDepartment')

        imgTrash.src = '../assets/img/trash.png'

        ulUserNotDepartment.append(liUserNotDepartment)
        liUserNotDepartment.append(nameUserNotDepartment, boxImg)
        boxImg.append(imgPenEdit, imgTrash)
    });
}


nameCompanyBySelect()

renderCompany(requestAllCompanies)
renderSectors()
renderUsers()
renderUserNotDepartment(userOffDepartment)
renderAllDepartment()
creatDepartment()

// showModalEditUser()
editWorkUserBySelect()