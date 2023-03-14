
const baseUrl = 'http://localhost:6278'
const requestHeaders = {
    "Content-Type": "application/json",
}
export const token = localStorage.getItem('@loginEmpresa:token')

export async function registerUser(body) {

    const addUser = await fetch(`http://localhost:6278/auth/register`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(body),
    })
        const response = await addUser.json()
    console.log(response)
        return response
    

}

export async function login(body) {

    const user = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(body)
    })
    if (user.ok) {
        const response = await user.json()

        localStorage.setItem('@loginEmpresa:token', response.token)
    }
}

export async function verifyTypeUser(token) {
    try {
        const request = await fetch(`${baseUrl}/auth/validate_user`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await request.json();

        return data.is_admin
    } catch (err) {
        console.log(err);
    }
}

export async function requestCompany() {
    const renderCompany = await fetch(`${baseUrl}/companies`)
    const responseAPI = await renderCompany.json()

    return responseAPI
}

export async function requestSectors(showSector) {
    const sectors = await fetch(`${baseUrl}/companies/${showSector}`)
    const responseAPI = await sectors.json()

    return responseAPI
}


export async function requestUsers(token) {
    const allUsers = await fetch(`${baseUrl}/users`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const responseAPI = await allUsers.json()
    return responseAPI
}

export async function userNotDepartment() {
    const userNotDepartment = await fetch(`${baseUrl}/admin/out_of_work`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const responseAPI = await userNotDepartment.json()
    return responseAPI
}
export async function allDepartment() {
    const allDepartment = await fetch(`${baseUrl}/departments`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const responseAPI = await allDepartment.json()
    return responseAPI
}


export async function searchUserOn (token) {

    const responseAPI = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        
    })

    const response = await responseAPI.json()
   

    return response

}

export async function onWorkerAtt(token, object) {

    const infoApi = await fetch(`${baseUrl}/users`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
         body: JSON.stringify(object)
    })
    const response = await infoApi.json()

    return response
}

export async function requestCreatDepartment (token, object) {

    const infoApi = await fetch(`http://localhost:6278/departments`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            body: JSON.stringify(object)
        }
    })
    const response = await infoApi.json()

    return response
}
