
const baseUrl = 'http://localhost:6278'
const requestHeaders = {
    "Content-Type": "application/json",
  }

  export async function registerUser(body) {

      const addUser = await fetch(`http://localhost:6278/auth/register`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(body),
      })
      .then(response => {
        if(response.ok){
            return response.json()
        }else{
            console.log("não foi possivel conclir o cadastro")
        }
      })
      return addUser
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
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${token}`,}
        });
        const data = await request.json();

        return data;
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
