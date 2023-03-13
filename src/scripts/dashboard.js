
export async function logout () {
    const logoutButton = document.querySelector('.logout')

    logoutButton.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

logout()