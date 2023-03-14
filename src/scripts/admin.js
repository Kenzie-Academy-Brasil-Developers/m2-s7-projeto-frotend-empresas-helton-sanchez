import { requestCompany, requestSectors, requestUsers, userNotDepartment, allDepartment, token } from "./request.js";


export async function logout () {
    const logoutButton = document.querySelector('.logout')

    logoutButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
        localStorage.clear()
    })
}

logout()

const renderDepartment = await requestCompany()

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
async function renderSectors() {
    const listSectors = document.querySelector('.selectCompany')
    
    listSectors.addEventListener('change', async (event) => {
        const sector = await requestSectors(event.target.value)
        renderCompany(sector)
    })
}
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
        imgTrash.src = '../assets/img/trash.png'
        
        ulAllUsers.appendChild(liAllUsers)
        liAllUsers.append(h3AllUsers, levelJob, nameCompany, boxImg)
        boxImg.append(imgPenEdit, imgTrash)
    });
}
async function renderNotDepartment() {
    const renderNotDepartment = await userNotDepartment()
    renderNotDepartment.forEach(element => {
    });
}
async function renderAllDepartment() {
    const renderAllDepartment = await allDepartment()
    renderAllDepartment.forEach(element => {
    });
}









renderCompany(renderDepartment)
renderSectors()
renderUsers()
renderNotDepartment()
renderAllDepartment()