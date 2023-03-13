import { requestCompany, requestSectors } from "./request.js";

const APIResponse = await requestCompany()

async function renderCompany (render) {
    const listCompany = document.querySelector('.companyList')
    listCompany.innerHTML = ""
    
    render.forEach(element => {
        const boxCompany = document.createElement('li')
        const name = document.createElement('h3')
        const hour = document.createElement('p')
        const sector = document.createElement('p')
        
        name.innerText = element.name
        hour.innerText = element.opening_hours

        sector.innerText = element.sectors.description
        sector.classList.add('sector')
        
        listCompany.appendChild(boxCompany)
        boxCompany.append(name, hour, sector)
        
        return boxCompany
    });
}



function renderSectors () {
    const listSectors = document.querySelector('.selecionarSetor')
    
    listSectors.addEventListener('change', async (event) => {
        const nameSector = event.target.value
        const sector = await requestSectors(nameSector)
        renderCompany(sector)
    })
}

renderCompany(APIResponse)
renderSectors()